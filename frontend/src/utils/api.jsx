import axios from "axios";
import "../styles/Api.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(err);
  },
);

export const authAPI = {
  register: (data) => api.post("/register", data),
  verifyOtp: (data) => api.post("/verify-otp", data),
  resendOtp: (data) => api.post("/resend-otp", data),
  login: (data) => api.post("/login", data),
  me: () => api.get("/me"),
  updateProfile: (data) => api.put("/profile", data),
};

export default api;
