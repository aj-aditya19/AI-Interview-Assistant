import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Attach the JWT to every request if it exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("iq_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the server returns 401, clear the stored token so the user is logged out
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("iq_token");
      window.location.href = "/auth";
    }
    return Promise.reject(err);
  }
);

export default api;
