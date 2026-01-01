import api from "./axios_Instance.js";

// Signup
export const signupUser = async (data) => {
  try {
    const res = await api.post("/api/v1/auth/sign-up", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed")
  }
};

// Login
export const loginUser = async (data) => {
  try {
    const res = await api.post("/api/v1/auth/sign-in", data);
    return res.data; // Expected: { user, token, message }
  } catch (error) {
    // Throw readable error to be handled by frontend
    throw new Error(error.response?.data?.message || "Login failed");
  }
};


// Logout
export const logoutUser = async () => {

  try {
    const res = await api.post("api/v1/auth/logout");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message)
  }
};

export const refreshToken = async () => {
  const res = await api.get("/auth/refresh");
  return res.data;
};