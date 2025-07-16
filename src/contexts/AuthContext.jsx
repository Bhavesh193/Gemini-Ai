import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      console.log('AuthContext: Initial user from localStorage:', parsedUser);
      return parsedUser;
    } catch (error) {
      console.error("AuthContext: Failed to parse user from localStorage on init:", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('AuthContext: User saved to localStorage:', user);
    } else {
      localStorage.removeItem('currentUser');
      console.log('AuthContext: User removed from localStorage.');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    toast.success(`Logged in as ${userData.phoneNumber}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast.info('Logged out successfully!');
    console.log('AuthContext: User logged out.');
  };

  const deleteAccountAndData = () => {
    if (user && user.phoneNumber) {
      localStorage.removeItem(`chatrooms_${user.phoneNumber}`);
      toast.error(`All data for ${user.phoneNumber} deleted!`);
      console.log(`AuthContext: Data for ${user.phoneNumber} deleted.`);
    }
    setUser(null);
    localStorage.removeItem('currentUser');
    toast.error('Account and all associated chat data deleted!');
    console.log('AuthContext: Account deleted.');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, deleteAccountAndData }}>
      {children}
    </AuthContext.Provider>
  );
};