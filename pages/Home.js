import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import RestaurantesContext from '../contextos/RestaurantesContext';
import ProductoHome from "../componentes/homeComponent";

const Home = () => {
    const { restaurantes, setRestaurantes } = useContext(RestaurantesContext);

    useEffect(() => {
        axios.get('https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/Restaurantes.json')
            .then((response) => {
                const arrayRestaurantes = Object.keys(response.data).map((id) => ({
                    id: id,
                    nombre: response.data[id].nombre,
                    foto: response.data[id].src,
                }));
                setRestaurantes(arrayRestaurantes);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [busqueda, setBusqueda] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    const handleChange = (value) => {
        setBusqueda(value);
        filtrar(value);
    };

    const filtrar = (terminoBusqueda) => {
        const arrayFiltrados = restaurantes.filter((elemento) =>
            elemento.nombre.toUpperCase().includes(terminoBusqueda.toUpperCase())
        );
        setProductosFiltrados(arrayFiltrados);
    };

    let contenido = null;

    if (productosFiltrados.length > 0) {
        contenido = (
            <ScrollView>
                {productosFiltrados.map((elemento) => (
                    <View key={elemento.id} style={styles.card}>
                        <ProductoHome nombre={elemento.nombre} src={elemento.foto} />
                    </View>
                ))}
            </ScrollView>
        );
    } else {
        if (busqueda) {
            contenido = (
                <View style={styles.noCoincidenciasText}>
                    <Text>¡Lo sentimos! No hay coincidencias con tu búsqueda.</Text>
                </View>
            );
        } else {
            if (restaurantes.length > 0) {
                contenido = (
                    <ScrollView>
                        {restaurantes.map((elemento) => (
                            <View key={elemento.id} style={styles.card}>
                                <ProductoHome nombre={elemento.nombre} src={elemento.foto} />
                            </View>
                        ))}
                    </ScrollView>
                );
            }
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Restaurantes disponibles</Text>
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        value={busqueda}
                        placeholder="Búsqueda por restaurante"
                        onChangeText={handleChange}
                    />
                </View>
                {contenido}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    input: {
        flex: 1,
    },
    card: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noCoincidenciasText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
});

export default Home;