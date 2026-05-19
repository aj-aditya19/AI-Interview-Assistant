import axios from "axios";
import "../styles/Api.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
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
  login: (data) => api.post("/login", data),
  me: () => api.get("/me"),
  updateProfile: (data) => api.put("/profile", data),
};

export const groqAPI = {
  reply: (text) => api.post("/groq/reply", { text }),
};

export const interviewAPI = {
  start: (setup) => api.post("/interview/session", { action: "start", setup }),
  review: (payload) =>
    api.post("/interview/session", { action: "review", ...payload }),
};

export const speechAPI = {
  speak: (text) =>
    api.post("/speech/speak", { text }, { responseType: "arraybuffer" }),
};

export default api;
