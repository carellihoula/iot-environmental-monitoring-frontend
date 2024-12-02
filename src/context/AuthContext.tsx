import { createContext, ReactNode, useContext, useState } from "react";
import { login as loginApi, register as registerApi } from "../api/auth";

interface AuthContextProps {
  user: any; // Remplacez `any` par un type utilisateur défini si nécessaire
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  loginLStorage: (user: any, token: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (email: string, password: string) => {
    try {
      const data = await loginApi({ email, password });
      loginLStorage(data.user, data.token);
    } catch (error) {
      throw error; // Gestion d'erreur dans le composant appelant
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const data = await registerApi({ username, email, password });
      loginLStorage(data.user, data.token);
    } catch (error) {
      throw error; // Gestion d'erreur dans le composant appelant
    }
  };

  const loginLStorage = (userData: any, token: string) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loginLStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
