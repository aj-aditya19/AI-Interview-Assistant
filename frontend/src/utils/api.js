import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("iq_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const requestUrl = err.config?.url || "";
    const isAuthRequest =
      /\/(login|register|forgot-password|reset-password)(\?|$)/.test(
        requestUrl,
      );

    if (err.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem("iq_token");
      window.location.href = "/auth";
    }

    return Promise.reject(err);
  },
);

export default api;
