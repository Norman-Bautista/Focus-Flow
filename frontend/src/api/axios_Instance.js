import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

// Frontend Refreshing token logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt refresh
        const res = await API.get("/api/v1/auth/refresh");
        const newToken = res.data?.accessToken;

        if (newToken) {
          localStorage.setItem("token", newToken);
          API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return API(originalRequest); // retry the original request
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("token");
        // optional: redirect to login
      }
    }
    return Promise.reject(error);
  }
);
export default API;