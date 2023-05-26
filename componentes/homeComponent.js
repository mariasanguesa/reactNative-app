import { Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ModoContext } from '../contextos/ModoContext';
import { useContext } from 'react';
import { Icon, Button } from 'react-native-elements';
import AutContext from '../contextos/AutContext';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

const HomeComponent = (props) => {

  const { modoOscuro } = useContext(ModoContext);

  const { autenticacion } = useContext(AutContext);

  const handleReserva = () => {
    const reservaData = {
      nombre: props.nombre
    };
    axios.post(`https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${autenticacion.localId}/reservas.json?auth=` + autenticacion.idToken, reservaData)
      .then((response) => {
        alert('Reserva realizada con éxito.');
      }).catch((event) => {
        console.log(event);
      })
  };

  return (
    <>
      <Text style={[styles.name, modoOscuro && styles.nameModoOscuro]}>{props.nombre}</Text>
      <Image style={styles.image} source={{ uri: props.src }} />
      <Button title="Reservar" onPress={handleReserva} buttonStyle={[styles.button, modoOscuro && styles.buttonModoOscuro]} icon={<Icon style={{ marginRight: 10 }} size={18} name="calendar" type="font-awesome" color="white" />} />
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
    textTransform: 'uppercase',
    margin: 10
  },
  nameModoOscuro: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    backgroundColor: 'lightpink',
    borderRadius: 8,
  },
  buttonModoOscuro: {
    backgroundColor: 'darkgray',
    borderRadius: 8,
  },
});

export default HomeComponent;