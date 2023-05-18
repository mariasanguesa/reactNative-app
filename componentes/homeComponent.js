import { Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ModoContext } from '../contextos/ModoContext';
import React, { useContext } from 'react';

const windowWidth = Dimensions.get('window').width;

const HomeComponent = (props) => {
  const { modoOscuro } = useContext(ModoContext);

  return (
    <>
      <Image style={styles.image} source={{ uri: props.src }} />
      <Text style={[styles.name, modoOscuro && styles.nameOscuro]}>{props.nombre}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
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
  nameOscuro: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white'
  },
});

export default HomeComponent;