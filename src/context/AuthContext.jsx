// Простой auth-стейт на демо: один текущий пользователь
import { createContext, useContext, useState, useEffect } from 'react';
import { getUserById, USERS } from '../data/users.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('spektr-user') || null);

  useEffect(() => {
    if (userId) localStorage.setItem('spektr-user', userId);
    else localStorage.removeItem('spektr-user');
  }, [userId]);

  const user = userId ? getUserById(userId) : null;

  const login = (id) => setUserId(id);
  const logout = () => setUserId(null);

  return (
    <AuthContext.Provider value={{ user, userId, login, logout, allUsers: USERS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
