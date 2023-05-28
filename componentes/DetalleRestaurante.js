import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Button  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import FavoritesContext from '../contextos/FavContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DetalleRestaurante = () => {
  const route = useRoute();
  const { restauranteId } = route.params;
  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReseñas] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [favorito, setFavorito] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigation = useNavigation();

  
 
  useEffect(() => {
    
    obtenerInformacionRestaurante(restauranteId);
    obtenerReseñas(restauranteId);
    
  }, []);
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  
  const handleAgregarReserva = () => {
    // Cambia el estado para mostrar u ocultar el formulario de reseña
    setMostrarFormulario(!mostrarFormulario);
  };

  const toggleFavorito = async () => {
  
    if (!favorito && !isFavorite) {
      const restauranteFavorito = {
        [restaurante.id]: {
          nombre: restaurante.name,
          imagen: restaurante.image_url
        }
      };
      addFavorite(restauranteFavorito);
    }
  
    if (favorito && isFavorite) {
      removeFavorite(restauranteId);
    }
  
    setFavorito(!favorito);
  };
  
  const obtenerInformacionRestaurante = async (restauranteId) => {
    try {
      const response = await fetch(`http://192.168.1.133:3000/restaurantes/${restauranteId}`);
      const restauranteData = await response.json();
      setRestaurante(restauranteData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const obtenerReseñas = async (restauranteId) => {
    try {
      const response = await fetch(`http://192.168.1.133:3000/reviews/${restauranteId}`);
      if (response.ok) {
        const data = await response.json();
        setReseñas(data.reviews);
        setLoading(false);
      } else {
        throw new Error('Error al obtener las reseñas del restaurante');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (!restaurante) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar la información del restaurante.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container} >
            <Icon name="arrow-left" size={24} onPress={handleGoBack}/>
            <View key={restaurante.id} style={styles.restauranteContainer}>
            <Text style={styles.nombre}>{restaurante.name}</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: restaurante.image_url }} style={styles.imagen} />
              {favorito && (
                <Icon
                  name={favorito ? 'heart' : 'heart-o'}
                  size={24}
                  color={favorito ? 'red' : 'black'}
                  style={styles.favoriteIcon}
                />
              )}
            </View>
          <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{restaurante.rating} / 5</Text>
          <StarRating rating={restaurante.rating} />
          </View>
          <Text style={styles.direccion}>{restaurante.location.address1}</Text>
          <Text style={styles.direccion}>{restaurante.location.city}, {restaurante.location.country}</Text>
        <View>
        <TouchableOpacity style={styles.buttonFav} onPress={toggleFavorito}>
          <Text style={styles.buttonText}>
            {favorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          </Text>
        </TouchableOpacity>
      </View>

        {mostrarFormulario && <ReviewForm />}
        {/* Botón para mostrar/ocultar el formulario */}
        <TouchableOpacity style={styles.button} onPress={handleAgregarReserva}>
          <Text style={styles.buttonText}>
            {mostrarFormulario ? 'Cancelar Reseña' : 'Agregar Reseña'}
          </Text>
        </TouchableOpacity>
         {/* Mapa */}
         <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: restaurante.coordinates.latitude,
            longitude: restaurante.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{latitude: restaurante.coordinates.latitude, longitude: restaurante.coordinates.longitude }} />
        </MapView> 
      </View>
        </View>
        <Text style={styles.nombre}>Reseñas</Text>
        </View>
        </ScrollView>
  );
        
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignContent: 'center',
    marginTop: 30
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    marginTop: 15
  },
  imagen: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    alignContent: 'center'
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 20,
    fontWeight: 'semi-bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  direccion: {
    fontSize: 20,
    fontWeight: 'semi-bold',
    marginBottom: 8,
  },
  ciudad: {
    fontSize: 20,
    fontWeight: 'semi-bold',
    marginBottom: 16,
  },
  reseñasTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reseñasContainer: {
    marginBottom: 16,
  },
  reseña: {
    marginBottom: 8,
  },
  reseñaRating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reseñaTexto: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#fda1f4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonFav:{
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#f7d239',
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    marginRight: 5,
  },
  mapContainer: {
    flex: 1,
    height: 200, // Altura deseada del mapa
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  imageContainerRes: {
    position: 'relative',
  },
  imagenRes: {
    width: 200,
    height: 200,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
export default DetalleRestaurante;

