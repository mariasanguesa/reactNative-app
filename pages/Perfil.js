import { ModoContext } from '../contextos/ModoContext';
import { useContext } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

const Perfil = () => {

    const { modoOscuro, toggleModoOscuro } = useContext(ModoContext);

    return (
        <View style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
            <View style={styles.rowContainer}>
                <Text style={[styles.texto, modoOscuro && styles.textoModoOscuro]}>Modo oscuro </Text>
                <Switch
                    value={modoOscuro}
                    onValueChange={toggleModoOscuro}
                    thumbColor={modoOscuro ? 'white' : 'black'}
                    trackColor={{ false: 'gray', true: 'gray' }}
                />
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Estilo claro por defecto
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerModoOscuro: {
        backgroundColor: 'black',
    },
    texto: {
        color: 'black', // Color de texto claro
    },
    textoModoOscuro: {
        color: 'white', // Color de texto en modo oscuro
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default Perfil;