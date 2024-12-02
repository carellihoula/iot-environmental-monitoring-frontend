import React, { useState } from "react";
import styled from "styled-components";

interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, email, password);
  };

  return (
    <FormContainer>
      <Title>Register</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="register-name">Name :</Label>
          <Input
            type="text"
            id="register-name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="type your name"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="register-email">Email :</Label>
          <Input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="type your email"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="register-password">Password :</Label>
          <Input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Typz your password"
          />
        </FormGroup>
        <Button type="submit">Sign Up</Button>
      </form>
    </FormContainer>
  );
};

export default Register;

// Réutilisation des mêmes styles que pour Login
const FormContainer = styled.div`
  width: 350px;
  max-width: 400px;
  border: 1px solid #ccc;
  height: 450px;
  color: #fff;
  border-radius: 8px;
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #218838;
  }
`;
