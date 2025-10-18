import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  }
});

// ✅ Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // adjust if you use cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// ❌ Optional: handle global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;