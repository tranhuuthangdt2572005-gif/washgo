import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // https://bubbling-backtrack-kitchen.ngrok-free.dev/api
  headers: {
    "Content-Type": "application/json",
    // "ngrok-skip-browser-warning": "true", // bỏ trang cảnh báo ngrok
  },
});

// Tự gắn token vào mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Token hết hạn -> đá về login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default api;
