import { ModoContext } from '../contextos/ModoContext';
import { useContext, useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, Switch, TextInput, TouchableOpacity, SafeAreaView, Image, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AutContext from '../contextos/AutContext';
import { API_KEY } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const Perfil = (props) => {

    const { modoOscuro, toggleModoOscuro } = useContext(ModoContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Para que las credenciales sean accesibles en todos los componentes se almacenan en un contexto. Que con el login se modificará
    const { autenticacion, actualizarSesion, cerrarSesion } = useContext(AutContext);
    const [infoUsuario, setInfoUsuario] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        if (autenticacion) {
            axios.get('https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json')
                .then((response) => {
                    setInfoUsuario(response.data[autenticacion.localId]);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log('Error cargando usuario');
                    setIsLoading(false);
                });
        }
    }, [autenticacion]);

    const handleLogin = () => {
        const authData = {
            email: email,
            password: password,
            // Genera el token 
            returnSecureToken: true
        }

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY, authData)
            .then((response) => {
                actualizarSesion(response.data);
            })
            .catch((error) => {
                alert('El usuario o contraseña no son correctos.');
            })
        setEmail('');
        setPassword('');
    };

    // Cuando se cierra la sesión se tiene que eliminar los datos almacenados
    const handleLogout = () => {
        cerrarSesion();
    };

    // Las siguientes lineas son para controlar el modal que aparece para editar las propiedades de los usuarios
    const [modalVisible, setModalVisible] = useState(false);
    const [valorEditado, setValorEditado] = useState('');
    const [propiedadEditada, setPropiedadEditada] = useState('');

    const abrirModal = (propiedad) => {
        setModalVisible(true);
        setValorEditado(infoUsuario[propiedad]);
        setPropiedadEditada(propiedad);
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const guardarCambios = () => {
        axios.patch(`https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${autenticacion.localId}.json?auth=` + autenticacion.idToken, { [propiedadEditada]: valorEditado, })
            .then((response) => {
                setInfoUsuario((prevInfoUsuario) => ({
                    ...prevInfoUsuario,
                    [propiedadEditada]: valorEditado,
                }));
                cerrarModal();
            })
            .catch((error) => {
                console.log('Error editando usuario');
            });
    };

    // Permiso para acceder a la galeria
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            // Permiso de la cámara denegado, muestra un mensaje o realiza una acción alternativa
            return;
        }

        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus !== 'granted') {
            // Permiso de la galería denegado, muestra un mensaje o realiza una acción alternativa
            return;
        }
    };


    // Abrir la biblioteca de imágenes para seleccionar una imagen
    const seleccionarImagen = async () => {
        await requestPermission();

        Alert.alert(
            'Seleccionar imagen',
            'Elige una opción',
            [
                {
                    text: 'Tomar foto',
                    onPress: tomarFoto,
                },
                {
                    text: 'Acceder a la galería',
                    onPress: abrirGaleria,
                },
            ],
            { cancelable: true }
        );
    };

    const abrirGaleria = async () => {
        await requestPermission();
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            axios.put(`https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${autenticacion.localId}/imagen.json?auth=` + autenticacion.idToken, result.assets[0])
                .then((response) => {
                    setInfoUsuario((prevInfoUsuario) => ({
                        ...prevInfoUsuario,
                        ['imagen']: result.assets[0],
                    }));
                })
                .catch((error) => {
                    console.error('Error.');
                });
        }
    }

    const tomarFoto = async () => {
        await requestPermission();

        const result = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            axios
                .put(`https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${autenticacion.localId}/imagen.json?auth=` + autenticacion.idToken, result.assets[0])
                .then((response) => {
                    setInfoUsuario((prevInfoUsuario) => ({
                        ...prevInfoUsuario,
                        ['imagen']: result.assets[0],
                    }));
                })
                .catch((error) => {
                    console.error('Error ');
                });
        }
    };

    const imagenPerfil = () => {
        if (infoUsuario.imagen && infoUsuario.imagen.uri) {
            return <Image source={{ uri: infoUsuario.imagen.uri }} style={styles.perfilImagen} />;
        } else {
            return <Ionicons name="person" size={200} color="gray" />;
        }
    };

    let contenido = null;

    if (!autenticacion) {
        contenido = (
            <>
                <View style={[styles.card, modoOscuro && styles.cardModoOscuro]}>
                    <Text style={[styles.title, modoOscuro && styles.titleModoOscuro]}>Inicio de sesión</Text>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={[styles.input, modoOscuro && styles.inputModoOscuro]}
                            placeholder="Correo electrónico"
                            placeholderTextColor={modoOscuro ? 'white' : 'black'}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={[styles.input, modoOscuro && styles.inputModoOscuro]}
                            placeholderTextColor={modoOscuro ? 'white' : 'black'}
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity style={[styles.button, modoOscuro && styles.buttonModoOscuro]} onPress={handleLogin}>
                            <Text style={[styles.buttonText, modoOscuro && styles.buttonTextModoOscuro]}>Iniciar sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.handleRegistroClick()}>
                            <Text style={[styles.texto, modoOscuro && styles.textoModoOscuro, { marginTop: 10, textDecorationLine: 'underline' }]}>¿Todavía no tienes cuenta? Regístrate aquí</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>);
    } else {
        contenido = (
            <>
                <Text style={[styles.title, modoOscuro && styles.titleModoOscuro, { marginTop: 30 }]}>¡Bienvenid@!</Text>
                <View style={[styles.perfilImagenContainer, modoOscuro && styles.perfilImagenContainerModoOscuro]}>
                    {imagenPerfil()}
                    <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center' }]} onPress={seleccionarImagen}>
                        <Ionicons name="pencil" size={15} color="gray" style={[{ marginRight: 10 }]} />
                        <Text style={{ color: modoOscuro ? 'white' : 'black' }} >Modificar imagen de perfil</Text>
                    </TouchableOpacity>
                </View>
                <View style={[{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, paddingVertical: 15 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.perfil, modoOscuro && styles.perfilModoOscuro]}>Nombre</Text>
                        <Text style={[styles.perfil, modoOscuro && styles.perfilModoOscuro]}>Fecha de nacimiento</Text>
                        <Text style={[styles.perfil, modoOscuro && styles.perfilModoOscuro]}>Correo electrónico</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.perfilValor, modoOscuro && styles.perfilValorModoOscuro]}>{infoUsuario.nombre}</Text>
                            <TouchableOpacity onPress={() => abrirModal('nombre')}>
                                <Ionicons name="pencil" size={15} color="gray" style={{ marginLeft: 5, marginBottom: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.perfilValor, modoOscuro && styles.perfilValorModoOscuro]}>{infoUsuario.fechaNacimiento}</Text>
                            <TouchableOpacity onPress={() => abrirModal('fechaNacimiento')}>
                                <Ionicons name="pencil" size={15} color="gray" style={{ marginLeft: 5, marginBottom: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.perfilValor, modoOscuro && styles.perfilValorModoOscuro]}>{infoUsuario.correoElectronico}</Text>
                        </View>

                        <Modal visible={modalVisible} onRequestClose={cerrarModal}>
                            <View style={[styles.modalEditar, modoOscuro && styles.modalEditarModoOscuro]}>
                                <Text style={[styles.modalTitle, modoOscuro && styles.modalTitleModoOscuro]}>
                                    Modifica tu {propiedadEditada === 'fechaNacimiento' ? 'fecha de nacimiento' : propiedadEditada}
                                </Text>
                                <TextInput style={[styles.inputModal, modoOscuro && styles.inputModalModoOscuro]} placeholderTextColor={modoOscuro ? 'white' : 'black'} value={valorEditado} onChangeText={setValorEditado} />
                                <TouchableOpacity style={[styles.guardarButton, modoOscuro && styles.guardarButtonModoOscuro]} onPress={() => guardarCambios()}>
                                    <Text style={[styles.guardarButtonText, modoOscuro && styles.guardarButtonTextModoOscuro]}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, modoOscuro && styles.buttonModoOscuro]} onPress={handleLogout}>
                    <Text style={[styles.buttonText, modoOscuro && styles.buttonTextModoOscuro]}>Cerrar sesión</Text>
                </TouchableOpacity>
            </>);
    }

    return (
        <SafeAreaView style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
            {isLoading ? (
                <ActivityIndicator marginTop={200} size="large" color="gray" />
            ) : (
                contenido
            )}
            <View style={styles.switchContainer}>
                <Text style={[styles.texto, modoOscuro && styles.textoModoOscuro]}>
                    {modoOscuro ? 'Modo claro ' : 'Modo oscuro '}
                </Text>
                <Switch
                    value={modoOscuro}
                    onValueChange={toggleModoOscuro}
                    thumbColor={modoOscuro ? 'white' : 'black'}
                    trackColor={{ false: 'gray', true: 'gray' }}
                />
            </View>
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerModoOscuro: {
        backgroundColor: 'black',
    },
    texto: {
        color: 'black', // Color de texto claro
    },
    textoModoOscuro: {
        color: 'lightgray', // Color de texto en modo oscuro
    },
    formContainer: {
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputModoOscuro: {
        color: 'white',
        borderColor: 'white',
    },
    button: {
        backgroundColor: 'lightpink',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonModoOscuro: {
        backgroundColor: 'lightgray',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    buttonTextModoOscuro: {
        color: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    titleModoOscuro: {
        color: 'white',
    },
    card: {
        flex: 1,
        backgroundColor: 'lightgray',
        marginBottom: 420,
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 30,
        elevation: 2
    },
    cardModoOscuro: {
        backgroundColor: 'gray'
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    perfilImagen: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'lightgray',
    },
    perfil: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    perfilModoOscuro: {
        color: 'white',
    },
    perfilValor: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    perfilValorModoOscuro: {
        color: 'lightgray',
    },
    modalEditar: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalEditarModoOscuro: {
        backgroundColor: 'black',
    },
    inputModal: {
        height: 40,
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: 'gray',
        backgroundColor: 'white',
        width: '100%',
    },
    inputModalModoOscuro: {
        color: 'white',
        borderColor: 'lightgray',
        backgroundColor: 'black',
    },
    guardarButton: {
        backgroundColor: 'lightpink',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
    },
    guardarButtonModoOscuro: {
        backgroundColor: 'lightgray',
    },
    guardarButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    guardarButtonTextModoOscuro: {
        color: 'white',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    modalTitleModoOscuro: {
        color: 'white',
    },
    perfilImagenContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    perfilImagenContainerModoOscuro: {
        borderColor: 'lightgray',
    },
});
export default Perfil;