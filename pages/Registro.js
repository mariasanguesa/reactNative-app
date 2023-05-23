import { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import axios from 'axios';
import { API_KEY } from '@env';
import AutContext from '../contextos/AutContext';
import { ModoContext } from '../contextos/ModoContext';
import { useNavigation } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [nombre, setNombre] = useState('');

    const { actualizarSesion } = useContext(AutContext);
    const { modoOscuro } = useContext(ModoContext);

    const navigation = useNavigation();

    const [showCalendar, setShowCalendar] = useState(false);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleRegistro = () => {
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
                    fechaNacimiento: nacimiento,
                    correoElectronico: email,
                };
                axios
                    .post('https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json', usuario)
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
    };

    return (
        <>
            <SafeAreaView style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
                <View style={[styles.card, modoOscuro && styles.cardModoOscuro]}>
                    <Text style={[styles.title, modoOscuro && styles.titleModoOscuro]}>Registrarse</Text>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={[styles.input, modoOscuro && styles.inputModoOscuro]}
                            placeholder="Nombre completo"
                            placeholderTextColor={modoOscuro ? 'white' : 'black'}
                            value={nombre}
                            onChangeText={setNombre}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={toggleCalendar}>
                            <TextInput
                                style={[styles.input, modoOscuro && styles.inputModoOscuro]}
                                placeholder="Fecha de nacimiento"
                                placeholderTextColor={modoOscuro ? 'white' : 'black'}
                                value={nacimiento}
                                onChangeText={setNacimiento}
                                autoCapitalize="none"
                                editable={false}
                            />
                        </TouchableOpacity>
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
                        <TouchableOpacity style={[styles.button, modoOscuro && styles.buttonModoOscuro]} onPress={handleRegistro}>
                            <Text style={[styles.buttonText, modoOscuro && styles.buttonTextModoOscuro]}>Registro</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal animationType="slide" transparent={true} visible={showCalendar}>
                        <View style={[styles.modalContainer, modoOscuro && styles.modalContainerModoOscuro]}>
                            <View style={[styles.calendarContainer, modoOscuro && styles.calendarContainerModoOscuro]}>
                                <CalendarPicker onDateChange={setNacimiento} />
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={toggleCalendar}>
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    calendarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    calendarContainerModoOscuro: {
        backgroundColor: 'gray',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainerModoOscuro: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'lightpink',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Registro;
