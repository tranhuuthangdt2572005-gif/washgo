import api from "./api";

export const authService = {
  login: async (identifier, password) => {
    const { data } = await api.post("/auth/login", { identifier, password });
    // data = { accessToken, refreshToken, role, fullName }
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.role);
    localStorage.setItem("fullName", data.fullName);
    return data;
  },

  register: async (payload) => {
    // payload = { fullName, email, phone, password }
    const { data } = await api.post("/auth/register", payload);
    return data;
  },

  logout: () => {
    localStorage.clear();
  },

  getRole: () => localStorage.getItem("role"),
  isAuthenticated: () => !!localStorage.getItem("accessToken"),
};
