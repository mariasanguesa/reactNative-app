import { useContext } from 'react';
import FavoritesContext from '../contextos/FavContext';
import { View, Text, Image, StyleSheet } from 'react-native';



const Favoritos = () => {
    const favoritos = useContext(FavoritesContext);
    console.log(favoritos.favorites);

    const objetoData = favoritos.favorites.reduce((obj, item) => {
        const key = Object.keys(item)[0];
        obj[key] = item[key];
        return obj;
      }, {});
    return (
        <View>
          <Text>Mis Favoritos:</Text>
          {objetoData.map((restaurante) => (
            <View key={objetoData[restaurante]} style={styles.favoritoContainer}>
              <Image source={{ uri: objetoData[restaurante].imagen }} style={styles.imagen} />
              <Text>{objetoData[restaurante].nombre}</Text>
            </View>
          ))}
        </View>
      );
};

const styles = StyleSheet.create({
    favoritoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    imagen: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
  });

export default Favoritos;