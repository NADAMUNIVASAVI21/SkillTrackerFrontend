<<<<<<< HEAD
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";
=======
import axios from "axios";
>>>>>>> 2d5effb8f40e0bc0806a95576f14a7b832374598

const api = axios.create({
  baseURL: "https://skilltrackerbackend-production.up.railway.app/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

<<<<<<< HEAD
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return setError("All fields required");
      }

      await login(email, password);

      navigate("/tasks");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-box">
      <h2>Sign In</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account?{" "}
        <span className="link" onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
=======
export default api;
>>>>>>> 2d5effb8f40e0bc0806a95576f14a7b832374598
