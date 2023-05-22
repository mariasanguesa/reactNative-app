import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AutContext = createContext();

export const AutProvider = ({ children }) => {

    const [autenticacion, setAutenticacion] = useState('');

    // No perder info al cerrar la app
    useEffect(() => {
        const recuperarSesion = async () => {
            try {
                const datosGuardados = await AsyncStorage.getItem('autenticacion');
                if (datosGuardados) {
                    setAutenticacion(JSON.parse(datosGuardados));
                }
            } catch (error) {
                console.log('Error al recuperar la sesión:', error);
            }
        };

        recuperarSesion();
    }, []);

    // Cambiar los datos de la sesión, por ejemplo al hacer login tienen que modificarse
    const actualizarSesion = async (datos) => {
        try {
            setAutenticacion(datos);
            await AsyncStorage.setItem('autenticacion', JSON.stringify(datos));
        } catch (error) {
            console.log('Error al actualizar la sesión:', error);
        }
    };

    // Cerrar la sesión y eliminar los datos
    const cerrarSesion = async () => {
        try {
            setAutenticacion(null);
            await AsyncStorage.removeItem('autenticacion');
        } catch (error) {
            console.log('Error al cerrar la sesión:', error);
        }
    };

    return (
        <AutContext.Provider value={{autenticacion,actualizarSesion,cerrarSesion}}>
            {children}
        </AutContext.Provider>
    );
};

export default AutContext;
