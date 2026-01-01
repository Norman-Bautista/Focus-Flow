import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios_Instance.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user token still valid or refresh it
  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Try hitting refresh endpoint
        const res = await api.get('/auth/refresh', { withCredentials: true });
        setUser(res.data.user); // backend should return user info if refresh successful
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    await api.post('/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
