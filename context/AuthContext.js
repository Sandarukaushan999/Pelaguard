// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (you can implement actual auth logic here)
    const checkAuth = async () => {
      try {
        // For now, simulate a logged-in salesperson
        // Replace with actual authentication logic
        const mockUser = {
          id: 'salesperson1',
          name: 'Salesperson',
          email: 'salesperson@lakshan.com',
          role: 'SALESPERSON'
        };
        setUser(mockUser);
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    // Implement actual login logic here
    // For now, return a mock user
    const mockUser = {
      id: 'salesperson1',
      name: 'Salesperson',
      email: email,
      role: 'SALESPERSON'
    };
    setUser(mockUser);
    return mockUser;
  };

  const logout = async () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};