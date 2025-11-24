import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// Use environment variable instead of localhost
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user on refresh
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // -----------------------------
  // ⭐ SIGNUP
  // -----------------------------
  const signup = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
    });
    return res.data;
  };

  // -----------------------------
  // ⭐ LOGIN
  // -----------------------------
  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const userData = {
      token: res.data.token,
      email: res.data.email,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // -----------------------------
  // ⭐ LOGOUT
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
