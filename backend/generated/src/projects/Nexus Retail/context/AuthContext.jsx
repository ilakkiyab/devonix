import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nexus_user")) || null;
    } catch {
      return null;
    }
  });
  
  const [darkMode, setDarkMode] = useState(false);

  const register = (email, password, name = "") => {
    const newUser = {
      id: Date.now(),
      email,
      name,
      createdAt: new Date().toISOString(),
      orders: [],
      addresses: [],
    };
    setUser(newUser);
    localStorage.setItem("nexus_user", JSON.stringify(newUser));
  };

  const login = (email) => {
    const newUser = {
      id: Date.now(),
      email,
      name: email.split("@")[0],
      createdAt: new Date().toISOString(),
      orders: [],
      addresses: [],
    };
    setUser(newUser);
    localStorage.setItem("nexus_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexus_user");
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("nexus_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, darkMode, setDarkMode, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
