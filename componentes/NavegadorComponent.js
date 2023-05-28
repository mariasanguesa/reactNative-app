import { useContext } from 'react';
import { StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../pages/Home';
import { RestaurantesProvider } from '../contextos/RestaurantesContext';
import Perfil from '../pages/Perfil';
import { ModoContext } from '../contextos/ModoContext';
import Reservas from '../pages/Reservas';
import Favoritos from '../pages/Favoritos';

const NavegadorComponent = () => {

    const { modoOscuro } = useContext(ModoContext);

    const HomeScreen = () => {
        return (
            <View style={styles.homePage}>
                <Home />
            </View>
        );
    };

    const ReservasScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Reservas/>
            </View>
        );
    };

    const PerfilScreen = () => {
        const navigation = useNavigation();

        const handleRegistroClick = () => {
            navigation.navigate('Registro');
        };

        return (
            <>
                <Perfil handleRegistroClick={handleRegistroClick} />
            </>


        );
    };

    const Favorito = () => {
        return (
            <View>
                <Favoritos />
            </View>
        );
    };

    const DetalleRestaurante = () => {
        return (
            <View>
                <DetalleRestaurante />
            </View>
        );
    };

    const Tab = createBottomTabNavigator();

    return (

        <RestaurantesProvider>
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
                        } else if (route.name === 'Favoritos'){
                            iconName = focused ? 'star' : 'star-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: modoOscuro ? 'white' : 'gray',
                    tabBarInactiveTintColor: modoOscuro ? 'white' : 'gray',
                    tabBarStyle: [styles.tabBar, modoOscuro && styles.tabBarModoOscuro],
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Reservas" component={ReservasScreen} />
                <Tab.Screen name="Perfil" component={PerfilScreen} />
                <Tab.Screen name="Favoritos" component={Favorito} />
            </Tab.Navigator>
        </RestaurantesProvider>
    );
};

const styles = StyleSheet.create({
    homePage: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
    },
    tabBar: {
        backgroundColor: 'white',
    },
    tabBarModoOscuro: {
        backgroundColor: 'black',
    },
});

export default NavegadorComponent;
