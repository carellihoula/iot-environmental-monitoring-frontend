import axiosInstance from "./axiosInstance";

// Fonction pour le login
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data; // { token }
};

// Fonction pour le register
export const register = async (details: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/register", details);
  return response.data; // { token }
};
