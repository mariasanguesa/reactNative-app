import { StyleSheet, View, Text, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './pages/Home';
import { RestaurantesProvider } from './contextos/RestaurantesContext';
import { useContext } from 'react';
import { ModoContext, ModoProvider } from './contextos/ModoContext';
import { Button } from 'react-native-elements';

const App = () => {

  const HomeScreen = () => {
    return (
      <View style={styles.homePage}>
        <Home />
      </View>
    );
  }

  const ReservasScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Reservas</Text>
      </View>
    );
  }

  const PerfilScreen = () => {

    const { modoOscuro, toggleModoOscuro } = useContext(ModoContext);

    return (
      <View style={[styles.container, modoOscuro && styles.containerModoOscuro]}>
        <View style={styles.rowContainer}>
          <Text style={[styles.texto, modoOscuro && styles.textoModoOscuro]}>Modo oscuro </Text>
          <Switch
            value={modoOscuro}
            onValueChange={toggleModoOscuro}
            thumbColor={modoOscuro ? 'white' : 'black'}
            trackColor={{ false: 'gray', true: 'gray' }}
          />
        </View>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <RestaurantesProvider>
      <ModoProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Reservas') {
                  iconName = focused ? 'book' : 'book-outline';
                } else if (route.name === 'Perfil') {
                  iconName = focused ? 'person-circle' : 'person-circle-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'gray',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Reservas" component={ReservasScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ModoProvider>
    </RestaurantesProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Estilo claro por defecto
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePage: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  containerModoOscuro: {
    backgroundColor: 'black',
  },
  texto: {
    color: 'black', // Color de texto claro por defecto
  },
  textoModoOscuro: {
    color: 'white', // Color de texto en modo oscuro
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;