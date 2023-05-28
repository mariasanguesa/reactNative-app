import { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Modal, Dimensions } from 'react-native';
import axios from 'axios';
import AutContext from '../contextos/AutContext';
import { ModoContext } from '../contextos/ModoContext';
import { useNavigation } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import { API_KEY } from '@env';

const Registro = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [nombre, setNombre] = useState('');

    const { autenticacion, actualizarSesion} = useContext(AutContext);
    const { modoOscuro } = useContext(ModoContext);

    const navigation = useNavigation();

    const [showCalendario, setShowCalendario] = useState(false);

    const handleCalendario = () => {
        setShowCalendario(!showCalendario);
    };
    const handleFecha = (fecha) => {
        setNacimiento(fecha.format('DD-MM-YYYY'));
        setShowCalendario(false);
    };

    //Se deben rellenar todos los campos para poder registrarse.
    const [camposSinRellenar, setCamposSinRellenar] = useState([]);

    const handleRegistro = () => {
        const camposSinRellenar = [];
        if (!nombre) camposSinRellenar.push('nombre');
        if (!nacimiento) camposSinRellenar.push('nacimiento');
        if (!email) camposSinRellenar.push('email');
        if (!password) camposSinRellenar.push('password');

        if (camposSinRellenar.length > 0) {
            setCamposSinRellenar(camposSinRellenar);
            return;
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, authData)
            .then((response) => {
                actualizarSesion(response.data);
                alert('Usuario registrado con éxito.');
                const usuario = {
                    nombre: nombre,
                    imagen:'',
                    fechaNacimiento: nacimiento,
                    correoElectronico: email,
                };
                console.log(usuario);
                //Importante que sea un put para que firebase no cree un identificador aleatorio. Las comillas tampoco tienen que ser simples.
                axios.put(`https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${response.data.localId}.json?auth=` + autenticacion.idToken, usuario)
                    .then((response) => {
                        console.log('Usuario almacenado con éxito.');
                    })
                    .catch((error) => {
                        console.error('Error al almacenar el usuario: ', error);
                    });

                navigation.navigate('Perfil');
            })
            .catch((error) => {
                alert('Error');
            });

        setEmail('');
        setPassword('');
        setNacimiento('');
        setNombre('');
        setCamposSinRellenar([]);
    };

    return (
        <>
            <SafeAreaView style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
                <View style={[styles.card, modoOscuro && styles.cardModoOscuro]}>
                    <Text style={[styles.title, modoOscuro && styles.titleModoOscuro]}>Registrarse</Text>
                    <View style={styles.formContainer}>
                        {camposSinRellenar.includes('nombre') && <Text style={styles.errorText}>Campo obligatorio</Text>}
                        <TextInput
                            style={[styles.input,modoOscuro && styles.inputModoOscuro,camposSinRellenar.includes('nombre') && styles.inputError]}
                            placeholder="Nombre completo"
                            placeholderTextColor={modoOscuro ? 'white' : 'black'}
                            value={nombre}
                            onChangeText={setNombre}
                            autoCapitalize="none"
                        />
                        <View style={styles.inputContainer}>
                            {camposSinRellenar.includes('nacimiento') && <Text style={styles.errorText}>Campo obligatorio</Text>}
                            <TextInput
                            style={[styles.input,modoOscuro && styles.inputModoOscuro,camposSinRellenar.includes('nacimiento') && styles.inputError]}
                            placeholder="Fecha de nacimiento"
                                placeholderTextColor={modoOscuro ? 'white' : 'black'}
                                value={nacimiento}
                                onChangeText={setNacimiento}
                                autoCapitalize="none"
                                editable={false}
                                onTouchStart={handleCalendario}
                            />
                        </View>
                        {camposSinRellenar.includes('email') && <Text style={styles.errorText}>Campo obligatorio</Text>}
                        <TextInput
                            style={[styles.input,modoOscuro && styles.inputModoOscuro,camposSinRellenar.includes('email') && styles.inputError]}
                            placeholder="Correo electrónico"
                            placeholderTextColor={modoOscuro ? 'white' : 'black'}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                        {camposSinRellenar.includes('password') && <Text style={styles.errorText}>Campo obligatorio</Text>}
                        <TextInput
                            style={[styles.input,modoOscuro && styles.inputModoOscuro,camposSinRellenar.includes('password') && styles.inputError]}
                            placeholderTextColor={modoOscuro ? 'white' : 'black'}
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity style={[styles.button, modoOscuro && styles.buttonModoOscuro]} onPress={handleRegistro}>
                            <Text style={[styles.buttonText, modoOscuro && styles.buttonTextModoOscuro]}>Registro</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={showCalendario}>
                        <View style={[styles.modalContainer, modoOscuro && styles.modalContainerModoOscuro]}>
                            <View style={styles.calendarModalContent}>
                                <CalendarPicker maxDate={new Date()} onDateChange={handleFecha} width={300} locale="es" />
                            </View>
                            <TouchableOpacity style={[styles.closeButton, modoOscuro && styles.closeButtonModoOscuro]} onPress={handleCalendario}>
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerModoOscuro: {
        backgroundColor: 'black',
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
        backgroundColor: 'lightgray',
        marginBottom: 390,
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 30
    },
    cardModoOscuro: {
        backgroundColor: 'gray'
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    modalContainerModoOscuro: {
        backgroundColor: 'gray',
    },
    closeButton: {
        padding: 10,
        backgroundColor: 'lightpink',
        borderRadius: 5,
    },
    closeButtonModoOscuro: {
        backgroundColor: 'black',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    calendarModalContent: {
        height: Dimensions.get('window').height * 0.35,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: 100,
    },
    calendarButtonContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});

export default Registro;
