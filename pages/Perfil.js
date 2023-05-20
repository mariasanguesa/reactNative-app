import { ModoContext } from '../contextos/ModoContext';
import { useContext, useState } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import AutContext from '../contextos/AutContext';

const Perfil = () => {

    const { modoOscuro, toggleModoOscuro } = useContext(ModoContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Para que las credenciales sean accesibles en todos los componentes se almacenan en un contexto. Que con el login se modificará
    const { autenticacion, setAutenticacion } = useContext(AutContext);

    const handleLogin = () => {
        const authData = {
            email: email,
            password: password,
            // Genera el token 
            returnSecureToken: true
        }

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz2len4LT2BmdNFZEQqzUF1j3hB-xtUsw', authData)
            .then((response) => {
                setAutenticacion(response.data);
            })
            .catch((error) => {
                alert('El usuario o contraseña no son correctos.');
            })
        setEmail('');
        setPassword('');
    };

    return (
        <SafeAreaView style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
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
                </View>
            </View>
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
        color: 'gray', // Color de texto en modo oscuro
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
        backgroundColor: 'black',
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
    },
    cardModoOscuro: {
        backgroundColor: 'gray'
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: 'lightgray',
    },

});
export default Perfil;