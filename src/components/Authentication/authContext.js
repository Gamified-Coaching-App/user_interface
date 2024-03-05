// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchSession } from './sessionManager';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    fetchSession().then(token => {
      setJwtToken(token);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);