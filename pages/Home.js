import { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import RestaurantesContext from '../contextos/RestaurantesContext';
import ProductoHome from "../componentes/homeComponent";
import { ModoContext } from '../contextos/ModoContext';

const Home = () => {

  // El contexto de restaurantes está creado para que se pueda acceder a el desde cualquier punto de la aplicación habiendo hecho solo una llamada a la base de datos
  const { restaurantes, setRestaurantes } = useContext(RestaurantesContext);
  const { modoOscuro } = useContext(ModoContext);


  const obtenerInformacionRestaurante = async () => {
    try {
      const response = await fetch('http://172.20.10.2:3000/restaurantes');
      const restauranteData = await response.json();
      setRestaurantes(restauranteData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerInformacionRestaurante();
  }, []);

  const array = Object.keys(restaurantes).map((clave) => {
    return {
      restaurantes: restaurantes[clave]
    };
  });

  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const handleChange = (value) => {
    setBusqueda(value);
    filtrar(value);
  };

  const filtrar = (terminoBusqueda) => {
    const arrayFiltrados = array[0].restaurantes.filter((elemento) =>
      elemento.name.toUpperCase().includes(terminoBusqueda.toUpperCase())
    );
    setProductosFiltrados(arrayFiltrados);
  };

  let contenido = null;

  const navigation = useNavigation();

  const handlePress = (restauranteId) => {
    navigation.navigate('DetalleRestaurante', { restauranteId: restauranteId });
  };

  if (productosFiltrados.length > 0) {
    contenido = (
      <ScrollView>
        {productosFiltrados.map((elemento) => (
          <TouchableOpacity key={elemento.id} onPress={() => handlePress(elemento.id)}>
            <View style={[styles.card, modoOscuro && styles.cardOscuro]}>                  
              <ProductoHome nombre={elemento.name} src={elemento.image_url} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  } else {
    if (busqueda) {
      contenido = (
        <View style={styles.noCoincidenciasText}>
          <Text style={{ color: modoOscuro ? 'white' : 'black' }}>¡Lo sentimos! No hay coincidencias con tu búsqueda.</Text>
        </View>
      );
    } else {
      if (array.length > 0) {
        contenido = (
          <ScrollView>
            {array[0].restaurantes.map((elemento) => (
              <TouchableOpacity key={elemento.id} onPress={() => handlePress(elemento.id)}>
                <View  style={[styles.card, modoOscuro && styles.cardOscuro]}>
                  <ProductoHome nombre={elemento.name} src={elemento.image_url} />
                </View>
              </TouchableOpacity>
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
        <MaterialIcons name="search" style={[styles.searchIcon, modoOscuro && styles.searchIconOscuro]} />
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
