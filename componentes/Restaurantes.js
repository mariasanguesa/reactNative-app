import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView  } from 'react-native';

const DetalleRestaurante = ({ restauranteId }) => {
  const [restaurantes, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReseñas] = useState(null);

  useEffect(() => {
    obtenerInformacionRestaurante();
  }, []);

  const obtenerInformacionRestaurante = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:3000/restaurantes`);
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
      const response = await fetch(`http://172.20.10.2:3000/reviews/${restauranteId}`);
      if (response.ok) {
        const data = await response.json();
        setReseñas(data);
        setLoading(false);
        console.log(data.reviews);
        return data.reviews;
      } else {
        console.log(response);
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

  if (!restaurantes) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar la información del restaurante.</Text>
      </View>
    );
  }
  const array = Object.keys(restaurantes).map((clave) => {
    return {
      restaurantes: restaurantes[clave]

    };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container} >
        {array[0].restaurantes.map((restaurante) => (
            <View key={restaurante.id} style={styles.restauranteContainer}>
            <Text style={styles.nombre}>{restaurante.name}</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: restaurante.image_url }} style={styles.imagen} />
            </View>
            <Text>{restaurante.id}</Text>
            <Text style={styles.rating}>{restaurante.rating} / 5</Text>
            <Text style={styles.direccion}>{restaurante.location.address1}</Text>
            <Text>{restaurante.location.city}, {restaurante.location.country}</Text>

        <Text>Reseñas:</Text>
        <FlatList
        data={restaurante.reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View>
            <Text>{item.rating} / 5</Text>
            <Text>{item.text}</Text>
            <Text>{reviews}</Text>
            </View>
        )}
        />

<TouchableOpacity style={styles.button} onPress={() => console.log("Reservar")}>
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
            </View>
               ))}
        </View>
        </ScrollView>
  );
        
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  rating: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center'
  },
  direccion: {
    fontSize: 16,
    marginBottom: 8,
  },
  ciudad: {
    fontSize: 16,
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
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default DetalleRestaurante;

