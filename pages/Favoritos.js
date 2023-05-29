import { useContext } from 'react';
import FavoritesContext from '../contextos/FavContext';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ModoContext } from '../contextos/ModoContext';

const Favoritos = () => {

  const favoritos = useContext(FavoritesContext);

  const { modoOscuro } = useContext(ModoContext);

  return (
    <SafeAreaView style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>      <View>
        <View style={styles.header}>
          <Text style={[styles.title, modoOscuro && styles.titleModoOscuro]}>Favoritos</Text>
          <Icon name="heart" size={24} color="red" />
        </View>
        {favoritos.favorites.map((favorito) => {
          const restauranteId = Object.keys(favorito)[0];
          const restaurante = favorito[restauranteId];
          return (
            <View key={restauranteId} style={styles.restauranteContainer}>
              <Image style={styles.imagen} source={{ uri: restaurante.imagen }} />
              <Text style={[styles.nombre, modoOscuro && styles.nombreModoOscuro]}>{restaurante.nombre}</Text>
            </View>
          );
        })}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  containerModoOscuro: {
    backgroundColor: 'black',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
    paddingLeft: 30,
    marginRight: 10
  },
  titleModoOscuro: {
    color: 'white',
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
  nombreModoOscuro: {
    color: 'white',
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