import { apiRequest } from "./config";

export const register = async (data) => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = async (email, password) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const logout = async () => {
  localStorage.removeItem("authToken");
  return { success: true };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};
