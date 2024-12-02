import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login, register } from "../api/auth";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import { useAuth } from "../context/AuthContext";

const AuthenticationPage: React.FC = () => {
  const { loginLStorage } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "register">("register"); // Default to register
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      const data = await login({ email, password });
      console.log(data);
      loginLStorage(data.user, data.token);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Error when connecting");
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    setError(null);
    try {
      const data = await register({ username, email, password });
      console.log("connecté: " + data.user);
      loginLStorage(data.user, data.token);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "error during registration.");
    }
  };

  return (
    <Container>
      <Tabs>
        <Tab
          active={activeTab === "login"}
          onClick={() => setActiveTab("login")}
        >
          Login
        </Tab>
        <Tab
          active={activeTab === "register"}
          onClick={() => setActiveTab("register")}
        >
          Register
        </Tab>
      </Tabs>
      {activeTab === "login" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Register onRegister={handleRegister} />
        </div>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default AuthenticationPage;

const Container = styled.div`
  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
  height: 100vh;
  background-color: #2b2d31;

  @media (max-width: 900px) {
    padding: 20px;
    overflow-y: auto;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? "#3c4043" : "#2b2d31")};
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  &:hover {
    background: #3c4043;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  margin-top: 10px;
  font-size: 0.9em;
`;
