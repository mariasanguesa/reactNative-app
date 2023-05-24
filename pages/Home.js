import { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import RestaurantesContext from '../contextos/RestaurantesContext';
import ProductoHome from "../componentes/homeComponent";
import { ModoContext } from '../contextos/ModoContext';

const Home = () => {
  // El contexto de restaurantes está creado para que se pueda acceder a el desde cualquier punto de la aplicación habiendo hecho solo una llamada a la base de datos
  const { restaurantes, setRestaurantes } = useContext(RestaurantesContext);
  const { modoOscuro } = useContext(ModoContext);

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
          <View key={elemento.id} style={[styles.card, modoOscuro && styles.cardOscuro]}>
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
              <View key={elemento.id} style={[styles.card, modoOscuro && styles.cardOscuro]}>
                <ProductoHome nombre={elemento.nombre} src={elemento.foto} />
              </View>
            ))}
          </ScrollView>
        );
      }
    }
  }

  return (
    <View style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
      <Text style={[styles.title, modoOscuro && styles.titleModoOscuro]}>Restaurantes disponibles</Text>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search"  style={[styles.searchIcon, modoOscuro && styles.searchIconOscuro]}/>
        <TextInput
          style={[styles.input, modoOscuro && styles.inputModoOscuro]}
          value={busqueda}
          placeholder="Búsqueda por restaurante"
          onChangeText={handleChange}
          placeholderTextColor={modoOscuro ? 'white' : 'black'}
        />
      </View>
      {contenido}
    </View>
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
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 50,
        color: 'black',
    },
    titleModoOscuro: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 50,
        color: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchIcon: {
      fontSize: 24,
      marginRight: 10,
      color: 'black',
    },
    searchIconOscuro: {
      color: 'white',
    },
    input: {
      flex: 2,
      color: 'black',
    },
    inputModoOscuro: {
      color: 'white',
    },
    card: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardOscuro: {
        backgroundColor: 'gray',
    },
    noCoincidenciasText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
});

export default Home;
