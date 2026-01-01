import axios from 'axios';

const api = axios.create({
  baseURL: "https://focus-flow-ioce.onrender.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // adjust if you use cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// ❌ Optional: handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("api error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Frontend Refreshing token logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt refresh
        const res = await api.get("/api/v1/auth/refresh");
        const newToken = res.data?.accessToken;

        if (newToken) {
          localStorage.setItem("token", newToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest); // retry the original request
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
export default api;