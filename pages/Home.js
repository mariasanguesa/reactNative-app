import { Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { VStack, Input, Icon, Stack, Center, NativeBaseProvider, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {

    const [busqueda, setBusqueda] = useState("");

    const handleChange = (e) => {
        setBusqueda(e.target.value);
    }

    return (
        <>
            <NativeBaseProvider>
                <VStack space={5} alignItems="center">
                    <Center>
                        <Text style={styles.title}>Restaurantes disponibles</Text>
                    </Center>
                    <Center flex={1} px="3">
                        <Stack space={4} w="100%" alignItems="center">
                            <Input w={{
                                base: "100%",
                                md: "100%"
                            }} InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />} value={busqueda}
                                placeholder="Búsqueda por restaurante"
                                onChange={handleChange} />
                        </Stack>
                    </Center>
                    <HStack space={3} justifyContent="center">
                        <Center h="40" w="130" rounded="md" shadow={3} />
                        <Center h="40" w="130" rounded="md" shadow={3} />
                    </HStack>
                    <HStack space={3} justifyContent="center">
                        <Center h="40" w="130" rounded="md" shadow={3} />
                        <Center h="40" w="130" rounded="md" shadow={3} />
                    </HStack>
                </VStack>
            </NativeBaseProvider>

        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: "20px",
        textAlign: "center",
        marginTop: '20px'
    }

});

export default Home;