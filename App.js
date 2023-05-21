import NavegadorComponent from './componentes/NavegadorComponent';
import { ModoProvider } from './contextos/ModoContext';
import { createStackNavigator } from '@react-navigation/stack';
import Registro from './pages/Registro';
import { NavigationContainer } from '@react-navigation/native';
import { AutProvider } from './contextos/AutContext';

const Stack = createStackNavigator();

const App = () => {


  return (
    <ModoProvider>
      <AutProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Navegador" component={NavegadorComponent} options={{ headerShown: false }} />
            <Stack.Screen
              name="Registro"
              component={Registro}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AutProvider>
    </ModoProvider>
  )
}

export default App;