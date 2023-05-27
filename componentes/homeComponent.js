import { Text, Image, StyleSheet, Dimensions, Modal, View, TextInput} from 'react-native';
import { ModoContext } from '../contextos/ModoContext';
import { useContext, useState} from 'react';
import { Icon, Button } from 'react-native-elements';
import AutContext from '../contextos/AutContext';
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';
import DatePickerIOS from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const windowWidth = Dimensions.get('window').width;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeComponent = (props) => {

  const { modoOscuro } = useContext(ModoContext);

  const { autenticacion } = useContext(AutContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [fecha, setFecha] = useState(null);
  const [numPersonas, setNumPersonas] = useState('');
  const [hora, setHora] = useState(new Date());

  const [camposSinRellenar, setCamposSinRellenar] = useState([]);

  const handleFecha = (fecha) => {
    setFecha(fecha.format('DD-MM-YYYY'));
  };

  const handleReserva1 = () => {
    if (!autenticacion) {
      alert('Necesitar iniciar sesión para poder realizar una reserva.');
      return;
    }
    setModalVisible(true);
  }
  const handleReserva = () => {

    const camposSinRellenar = [];
    if (!fecha) camposSinRellenar.push('fecha');
    if (!numPersonas) camposSinRellenar.push('numPersonas');

    if (camposSinRellenar.length > 0) {
      setCamposSinRellenar(camposSinRellenar);
      return;
    }

    // Para quedarme solo con las horas y minutos
    const h = hora.getHours().toString().padStart(2, '0');
    const m = hora.getMinutes().toString().padStart(2, '0');

    const reservaData = {
      nombre: props.nombre,
      fecha: fecha,
      hora: `${h}:${m}`,
      comensales: numPersonas,
    };

    axios.post(`https://reactnative-app-5299e-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${autenticacion.localId}/reservas.json?auth=` + autenticacion.idToken, reservaData)
      .then((response) => {
        alert('Reserva realizada con éxito.');
      }).catch((event) => {
        console.log('error:'+event);
      })

    setModalVisible(false);
    setNumPersonas('');
    setFecha(null);
    setCamposSinRellenar([]);

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Confirmación de reserva',
        body: "El día " + fecha + " a las " + `${h}:${m}` + " tienes una reserva en " + props.nombre + " para " + numPersonas + " personas. ¡Esperamos que lo disfrutes!",
      },
      trigger: null,
    });
  };


  return (
    <>
      <Text style={[styles.name, modoOscuro && styles.nameModoOscuro]}>{props.nombre}</Text>
      <Image style={styles.image} source={{ uri: props.src }} />
      <Button title="Reservar" onPress={handleReserva1} buttonStyle={[styles.button, modoOscuro && styles.buttonModoOscuro]} icon={<Icon style={{ marginRight: 10 }} size={18} name="calendar" type="font-awesome" color="white" />} />
      <Modal visible={modalVisible} >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalles de tu reserva</Text>
          {camposSinRellenar.includes('fecha') && <Text style={styles.errorText}>La fecha es un campo obligatorio</Text>}
          <CalendarPicker minDate={new Date()} onDateChange={handleFecha} />
          <DatePickerIOS
            mode="time"
            value={hora}
            onChange={(event, hora) => setHora(hora)}
          />
          {camposSinRellenar.includes('numPersonas') && <Text style={styles.errorText}>Indica el número de compensales</Text>}
          <TextInput
            style={[styles.input, camposSinRellenar.includes('numPersonas') && styles.inputError]}
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
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  inputError: {
    borderColor: 'red',
  },
});

export default HomeComponent;