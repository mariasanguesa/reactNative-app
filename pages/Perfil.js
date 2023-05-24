import { ModoContext } from '../contextos/ModoContext';
import { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import AutContext from '../contextos/AutContext';
import { API_KEY } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Perfil = (props) => {

    const { modoOscuro, toggleModoOscuro } = useContext(ModoContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Para que las credenciales sean accesibles en todos los componentes se almacenan en un contexto. Que con el login se modificará
    const { autenticacion, actualizarSesion, cerrarSesion } = useContext(AutContext);

    const [infoUsuario, setInfoUsuario] = useState([]);

    useEffect(() => {
        if (autenticacion) {
            axios.get('https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json')
                .then((response) => {
                    setInfoUsuario(response.data[autenticacion.localId]);
                })
                .catch((error) => {
                    console.log('Error');
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
                <Image style={styles.perfilImagen} />
                <View style={[{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, paddingVertical: 15 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.perfil, modoOscuro && styles.perfilModoOscuro]}>Nombre</Text>
                        <Text style={[styles.perfil, modoOscuro && styles.perfilModoOscuro]}>Fecha de nacimiento</Text>
                        <Text style={[styles.perfil, modoOscuro && styles.perfilModoOscuro]}>Correo electrónico</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.perfilValor, modoOscuro && styles.perfilValorModoOscuro]}>{infoUsuario.nombre}</Text>
                            <Ionicons name="pencil" size={15} color="gray" style={{ marginLeft: 5 }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.perfilValor, modoOscuro && styles.perfilValorModoOscuro]}>{infoUsuario.fechaNacimiento}</Text>
                            <Ionicons name="pencil" size={15} color="gray" style={{ marginLeft: 5 }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.perfilValor, modoOscuro && styles.perfilValorModoOscuro]}>{infoUsuario.correoElectronico}</Text>
                            <Ionicons name="pencil" size={15} color="gray" style={{ marginLeft: 5 }} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, modoOscuro && styles.buttonModoOscuro]} onPress={handleLogout}>
                    <Text style={[styles.buttonText, modoOscuro && styles.buttonTextModoOscuro]}>Cerrar sesión</Text>
                </TouchableOpacity>
            </>);
    }

    return (
        <SafeAreaView style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
            {contenido}
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
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    perfil: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    perfilModoOscuro: {
        color: 'white',
    },
    perfilValor: {
        fontSize: 14,
        color: 'gray',
    },
    perfilValorModoOscuro: {
        color: 'lightgray',
    },

});
export default Perfil;