import { useContext, useEffect, useState } from 'react';
import { ModoContext } from '../contextos/ModoContext';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import RestaurantesContext from '../contextos/RestaurantesContext';
import AutContext from '../contextos/AutContext';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Reservas = () => {
    const { restaurantes } = useContext(RestaurantesContext);

    const { modoOscuro } = useContext(ModoContext);

    const [infoReservas, setInfoReservas] = useState([]);

    const { autenticacion } = useContext(AutContext);

    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        if (autenticacion) {
            setIsLoading(true); // Establecer el estado de carga en true
            axios.get('https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json')
                .then((response) => {
                    setInfoReservas(response.data[autenticacion.localId].reservas);
                    setIsLoading(false); 
                })
                .catch((error) => {
                    setIsLoading(false); 
                })

        }
    }, [autenticacion]);

    const cancelarReserva = (id) => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro de querer eliminar la reserva?',
            [{
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Aceptar',
                onPress: () => {
                    axios.delete(`https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${autenticacion.localId}/reservas/${id}.json?auth=` + autenticacion.idToken)
                        .then((response) => {
                            const nuevasReservas = Object.entries(infoReservas).filter(([reservaId, reserva]) => reservaId !== id);
                            const nuevasReservasObjeto = Object.fromEntries(nuevasReservas);
                            setInfoReservas(nuevasReservasObjeto);
                        })
                        .catch((error) => {
                            alert('No se ha podido eliminar la reserva de la base de datos.');
                        })
                },
            },
            ],
        );

    }

    let contenido = null;

    if (!autenticacion) {
        contenido = (
            <View style={[styles.errorContainer, modoOscuro && styles.errorContainerModoOscuro]}>
                <Ionicons name="alert-circle-outline" size={200} color="gray" />
                <Text style={[styles.errorTexto, modoOscuro && styles.errorTextoModoOscuro]}>
                    Debes iniciar sesión para ver tus reservas.
                </Text>
            </View>
        );
    } else {
        if (!infoReservas) {
            contenido = (
                <View style={[styles.errorContainer, modoOscuro && styles.errorContainerModoOscuro]}>
                    <Text style={[styles.titulo, modoOscuro && styles.tituloModoOscuro]}>¡No tienes reservas!</Text>
                    <Ionicons name="close-circle-outline" size={200} color="gray" />
                </View>
            );
        } else {

            contenido = (
                <>
                    <Text style={[styles.titulo, modoOscuro && styles.tituloModoOscuro]}>Mis reservas</Text>
                    <FlatList
                        data={Object.values(infoReservas)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            const restaurante = restaurantes.businesses.find(
                                (restaurante) => restaurante.name === item.nombre
                            );
                            const reservaId = Object.keys(infoReservas).find(
                                (key) => infoReservas[key].nombre === item.nombre
                            );
                            console.log(restaurante.image_url);

                            return (
                                <View style={[styles.reservaContainer, modoOscuro && styles.reservaContainerModoOscuro]}>
                                    <Image source={{ uri: restaurante.image_url }} style={styles.fotoRestaurante} />
                                    <Text style={[styles.reservaNombre, modoOscuro && styles.reservaNombreModoOscuro]}>
                                        {item.nombre}
                                    </Text>
                                    <View style={styles.reservaDetalle}>
                                        <View style={styles.reservaTextoContainer}>
                                            <Ionicons name="calendar-outline" size={16} color="gray" style={styles.iconoFecha} />
                                            <Text style={styles.reservaTexto}>{item.fecha}</Text>
                                        </View>
                                        <View style={styles.reservaTextoContainer}>
                                            <Ionicons name="people-outline" size={16} color="gray" style={styles.iconoComensales} />
                                            <Text style={styles.reservaTexto}>{item.comensales}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.cancelarButton} onPress={() => cancelarReserva(reservaId)}>
                                        <Text style={styles.cancelarButtonText}>Cancelar reserva</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </>
            );
        }
    }

    return (
        <SafeAreaView style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
            {isLoading ? (
                <ActivityIndicator marginTop={200} size="large" color="gray" />
            ) : (
                contenido
            )}
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    containerModoOscuro: {
        backgroundColor: 'black',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        marginTop: 20,
    },
    tituloModoOscuro: {
        color: 'white',
    },
    reservaContainer: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    reservaContainerModoOscuro: {
        backgroundColor: '#2B2B2B',
    },
    reservaNombre: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'gray',
    },
    reservaNombreModoOscuro: {
        color: 'white',
    },
    reservaDetalle: {
        flexDirection: 'row',
    },
    reservaTexto: {
        fontSize: 16,
        color: 'gray',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    errorContainerModoOscuro: {
        backgroundColor: 'black'
    },
    iconoError: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    errorTexto: {
        fontSize: 18,
        color: 'gray',
    },
    errorTextoModoOscuro: {
        color: 'white',
    },
    reservaDetalle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    reservaTextoContainer: {
        flexDirection: 'row',
        marginRight: 10,
    },
    iconoFecha: {
        marginRight: 5,
    },
    iconoComensales: {
        marginRight: 5,
    },
    fotoRestaurante: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
    cancelarButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    cancelarButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Reservas;
