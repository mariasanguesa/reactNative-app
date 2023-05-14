import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { VStack, Input, Icon, Stack, Center, NativeBaseProvider, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import RestaurantesContext from '../contextos/RestaurantesContext';
import axios from "axios";
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
            <VStack space={3} alignItems="center">
                {productosFiltrados.map((elemento) => (
                    <HStack space={3} justifyContent="center" key={elemento.id}>
                        <Center h={80} w={375} rounded="md" shadow={3}>
                            <ProductoHome nombre={elemento.nombre} src={elemento.foto} />
                        </Center>
                    </HStack>
                ))}
            </VStack>
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
                    <VStack space={3} alignItems="center">
                        {restaurantes.map((elemento) => (
                            <HStack space={3} justifyContent="center" key={elemento.id}>
                                <Center h={80} w={375} rounded="md" shadow={3}>
                                    <ProductoHome nombre={elemento.nombre} src={elemento.foto} />
                                </Center>
                            </HStack>
                        ))}
                    </VStack>
                );
            }
        }
    }

    return (
        <SafeAreaView>
            <NativeBaseProvider>
                <VStack space={5} alignItems="center">
                    <Center>
                        <Text style={styles.title}>Restaurantes disponibles</Text>
                    </Center>
                    <Center flex={1} px="3" py="2">
                        <Stack space={4} w="100%" alignItems="center">
                            <Input
                                w={{
                                    base: "100%",
                                    md: "100%"
                                }}
                                InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />}
                                value={busqueda}
                                placeholder="Búsqueda por restaurante"
                                onChangeText={handleChange}
                            />
                        </Stack>
                    </Center>
                    <Center>
                    <ScrollView style={{ flex: 1,height: "100%" }}>
                            {contenido}
                        </ScrollView>
                    </Center>
                </VStack>
            </NativeBaseProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 20
    },
    noCoincidenciasText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    }
});

export default Home;