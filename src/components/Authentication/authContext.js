import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchSession } from './sessionManager';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetchSession().then(token => {
      setJwtToken(token);
      if (token) {
        const decodedToken = parseJwt(token);
        console.log("Decoded token:", decodedToken);
        setUsername(decodedToken.username);
        // Store username in local storage
        localStorage.setItem('username', decodedToken.preferred_username);
      } else {
        // Clear username from local storage if token is null
        localStorage.removeItem('username');
      }
    });
  }, []);

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);