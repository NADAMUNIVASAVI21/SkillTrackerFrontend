import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = "http://localhost:5000/api"; 
// Change to your Railway backend URL after deployment

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from storage on refresh
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

    // Save token + email
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
