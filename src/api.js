import axios from "axios";

// Use environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  if (stored) {
    const token = JSON.parse(stored).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
