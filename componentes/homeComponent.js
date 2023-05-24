import { Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ModoContext } from '../contextos/ModoContext';
import { useContext } from 'react';

const windowWidth = Dimensions.get('window').width;

const HomeComponent = (props) => {
  const { modoOscuro } = useContext(ModoContext);

  return (
    <>
      <Image style={styles.image} source={{ uri: props.src }} />
      <Text style={[styles.name, modoOscuro && styles.nameModoOscuro]}>{props.nombre}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: windowWidth - 40,
    height: windowWidth - 40,
    marginBottom: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameModoOscuro: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white'
  },
});

export default HomeComponent;