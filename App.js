import NavegadorComponent from './componentes/NavegadorComponent';
import { ModoProvider } from './contextos/ModoContext';
import { createStackNavigator } from '@react-navigation/stack';
import Registro from './pages/Registro';
import { NavigationContainer } from '@react-navigation/native';
import { AutProvider } from './contextos/AutContext';
import { FavoritesProvider } from './contextos/FavContext';
import DetalleRestaurante from './componentes/DetalleRestaurante';
import HomeComponent from './componentes/homeComponent';
import Favoritos from './pages/Favoritos';

const Stack = createStackNavigator();

const App = () => {


  return (
    <ModoProvider>
      <AutProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Navegador" component={NavegadorComponent} options={{ headerShown: false }} />
            <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }}/>
            <Stack.Screen name="DetalleRestaurante" component={DetalleRestaurante} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={HomeComponent} options={{ headerShown: false }} />
            <Stack.Screen name="Favoritos" component={Favoritos} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        </FavoritesProvider>
      </AutProvider>
    </ModoProvider>
  )
}

export default App;