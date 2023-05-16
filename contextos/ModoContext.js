import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ModoContext = createContext();

export const ModoProvider = ({ children }) => {
    const [modoOscuro, setModoOscuro] = useState(false);

    useEffect(() => {
        const obtenerModoOscuro = async () => {
            try {
                const modoOscuroGuardado = await AsyncStorage.getItem('modoOscuro');
                setModoOscuro(modoOscuroGuardado === 'true');
            } catch (error) {
                console.error('Error');
            }
        };
        obtenerModoOscuro();
    }, []);

    const toggleModoOscuro = async () => {
        const nuevoModoOscuro = !modoOscuro;
        setModoOscuro(nuevoModoOscuro);
        try {
            await AsyncStorage.setItem('modoOscuro', nuevoModoOscuro.toString());
        } catch (error) {
            console.error('Error');
        }
    };

    return (
        <ModoContext.Provider value={{ modoOscuro, toggleModoOscuro }}>
            {children}
        </ModoContext.Provider>
    );
};
