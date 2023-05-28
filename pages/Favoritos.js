import { useContext } from 'react';
import FavoritesContext from '../contextos/FavContext';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Favoritos = () => {
    const favoritos = useContext(FavoritesContext);
    console.log(favoritos.favorites);
    return (
        <ScrollView>
        <View>
        <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
        <Icon name="heart" size={24} color="red" />
       </View>
        {favoritos.favorites.map((favorito) => {
          const restauranteId = Object.keys(favorito)[0];
          console.log(restauranteId);
          const restaurante = favorito[restauranteId];
          return (
            <View key={restauranteId} style={styles.restauranteContainer}>
              <Image style={styles.imagen} source={{ uri: restaurante.imagen }} />
              <Text style={styles.nombre}>{restaurante.nombre}</Text>
            </View>
          );
        })}
      </View>
      </ScrollView>
      );
};

const styles = StyleSheet.create({
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 16,
      marginTop: 12,
      paddingLeft: 30,
      marginRight: 10
    },
    restauranteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      paddingLeft: 30
    },
    imagen: {
      width: 100,
      height: 100,
      marginRight: 16,
    },
    nombre: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    favoriteIcon: {
      fontSize: 25,
      fontWeight: 'bold',
      paddingLeft: 30
      },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 80,
      },
  });

export default Favoritos;