import axios from "axios";
import "../styles/Api.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 30000,
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
    const requestUrl = err.config?.url || "";
    const isAuthRequest = /\/(login|register)(\?|$)/.test(requestUrl);

    if (err.response?.status === 401 && !isAuthRequest) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.dispatchEvent(new Event("auth:session-expired"));
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
  finish: (payload) =>
    api.post("/interview/session", { action: "finish", ...payload }),
  clear: (sessionId) =>
    api.delete(`/interview/session/${encodeURIComponent(sessionId)}`),
};

export const speechAPI = {
  speak: (text) =>
    api.post("/speech/speak", { text }, { responseType: "arraybuffer" }),
};

// export const avatarAPI = {
//   speak: (text) => api.post("/avatar/speak", { text }),

//   status: (id) => api.get(`/avatar/status/${id}`),
// };

export default api;
