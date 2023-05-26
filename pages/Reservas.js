import { useContext } from 'react';
import { ModoContext } from '../contextos/ModoContext';
import { StyleSheet, View, Text } from 'react-native';

const Reservas = () => {

    const { modoOscuro } = useContext(ModoContext);

    return (
        <>
            <View style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
                <Text>Empezando</Text>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerModoOscuro: {
        backgroundColor: 'black',
    },
});

export default Reservas;
