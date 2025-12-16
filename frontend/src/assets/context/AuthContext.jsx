import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const isAuthenticated = !!token;

  // Atualiza o header da API sempre que o token muda
  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.Authorization;
      localStorage.removeItem('token');
    }
  }, [token]);
  
  // Função usada na página de Login para salvar o token
  const login = (jwtToken) => {
    setToken(jwtToken);
  };

  // Função usada na Sidebar para sair
  const logout = () => {
    setToken(null);
  };
  
  // Garante que o estado interno do token reflita o localStorage
  useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && storedToken !== token) {
          setToken(storedToken);
      }
  // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};