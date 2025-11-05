import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
       
        setUser(userData);
        localStorage.setItem('user' , JSON.stringify(userData));
    
    };
     const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
     };
     return <AuthContext.Provider value={{user, login , logout}}>{children}</AuthContext.Provider>
};
AuthProvider.propTypes ={
    children: PropTypes.node
};
export const useAuth = () => useContext(AuthContext);