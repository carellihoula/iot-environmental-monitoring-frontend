import React, { useState } from "react";
import styled from "styled-components";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <FormContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="login-email">Email :</Label>
          <Input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="type your email"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="login-password">Password :</Label>
          <Input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Type your password"
          />
        </FormGroup>
        <Button type="submit">Sign In</Button>
      </form>
    </FormContainer>
  );
};

export default Login;

// Styles spécifiques au composant Login
const FormContainer = styled.div`
  width: 350px;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #fff;
  padding: 20px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  background-color: #313338;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
  border: 1px solid #aaa;
  border-radius: 4px;
  color: #000;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
