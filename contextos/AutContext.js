import { createContext, useState } from 'react';

const AutContext = createContext();

export const AutProvider = ({ children }) => {

    const [autenticacion, setAutenticacion] = useState([]);

    return (
        <AutContext.Provider value={{ autenticacion, setAutenticacion }}>
            {children}
        </AutContext.Provider>
    );
};

export default AutContext;