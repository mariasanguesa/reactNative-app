import { Text, Image, StyleSheet, Dimensions, Modal, View, TextInput } from 'react-native';
import { ModoContext } from '../contextos/ModoContext';
import { useContext, useState } from 'react';
import { Icon, Button } from 'react-native-elements';
import AutContext from '../contextos/AutContext';
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';

const windowWidth = Dimensions.get('window').width;

const HomeComponent = (props) => {

  const { modoOscuro } = useContext(ModoContext);

  const { autenticacion } = useContext(AutContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [fecha, setFecha] = useState(new Date());
  const [numPersonas, setNumPersonas] = useState('');

  const handleReserva = () => {
    const reservaData = {
      nombre: props.nombre,
      fecha: fecha.format('DD-MM-YYYY'),
      comensales: numPersonas,
    };
    axios.post(`https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${autenticacion.localId}/reservas.json?auth=` + autenticacion.idToken, reservaData)
      .then((response) => {
        alert('Reserva realizada con éxito.');
      }).catch((event) => {
        console.log(event);
      })
    setModalVisible(false);
    setNumPersonas('');
  };

  console.log(modalVisible);
  return (
    <>
      <Text style={[styles.name, modoOscuro && styles.nameModoOscuro]}>{props.nombre}</Text>
      <Image style={styles.image} source={{ uri: props.src }} />
      <Button title="Reservar" onPress={() => setModalVisible(true)} buttonStyle={[styles.button, modoOscuro && styles.buttonModoOscuro]} icon={<Icon style={{ marginRight: 10 }} size={18} name="calendar" type="font-awesome" color="white" />} />
      <Modal visible={modalVisible} >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalles de tu reserva</Text>
          <CalendarPicker onDateChange={(fecha) => setFecha(fecha)} />
          <TextInput
            style={styles.input}
            placeholder="Número de comensales"
            keyboardType="numeric"
            value={numPersonas}
            onChangeText={(personas) => setNumPersonas(personas)}
          />
          <Button title="Confirmar reserva" onPress={handleReserva} buttonStyle={[styles.button, modoOscuro && styles.buttonModoOscuro]} icon={<Icon style={{ marginRight: 10 }} size={18} name="check" type="font-awesome" color="white" />} />
        </View>
      </Modal>
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default HomeComponent;