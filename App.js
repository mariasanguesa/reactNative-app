import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './pages/Home';
import React, { useState, useEffect } from 'react';
import { RestaurantesProvider } from './contextos/RestaurantesContext';

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
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Tu cuenta</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <RestaurantesProvider>
       <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
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
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Reservas" component={ReservasScreen} />
          <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
      </NavigationContainer> 
    </RestaurantesProvider>
  )
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePage: {
    flex: 1,
    alignItems: 'center'
  }
}); 

export default App;
