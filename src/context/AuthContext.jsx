import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- NEW

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      setUser(JSON.parse(saved));
    }

    setLoading(false); // <-- FINISH RESTORING USER
  }, []);

  const login = (token, email) => {
    const userData = { token, email };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
