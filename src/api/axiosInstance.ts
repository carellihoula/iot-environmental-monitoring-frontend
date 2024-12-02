import axios from "axios";

const API_URL = "https://your-api-url.com"; // Remplacez par votre URL de base de l'API

// Crée une instance Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajoute un intercepteur pour inclure le token Bearer
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Remplacez par votre méthode pour obtenir le token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
