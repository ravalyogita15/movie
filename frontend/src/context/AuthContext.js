import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: localStorage.getItem('token') || null,
  });

  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers['Authorization'] = `Bearer ${authState.token}`;
    }
  }, [authState.token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      setAuthState({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setAuthState({ user: null, token: null });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
