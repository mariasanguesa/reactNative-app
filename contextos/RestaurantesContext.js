import { createContext, useState } from 'react';

const RestaurantesContext = createContext();

export const RestaurantesProvider = ({ children }) => {

    const [restaurantes, setRestaurantes] = useState('');

    return (
        <RestaurantesContext.Provider value={{ restaurantes, setRestaurantes }}>
            {children}
        </RestaurantesContext.Provider>
    );
};

export default RestaurantesContext;