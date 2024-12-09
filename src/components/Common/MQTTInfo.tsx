import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import styled from "styled-components";

const MQTTInfo: React.FC = () => {
  const MQTT_URL =
    "wss://fa815df1d66e462186a324bd1494e4c1.s1.eu.hivemq.cloud:8884/mqtt";
  const MQTT_USERNAME = "carellihoula";
  const MQTT_PASSWORD = "123456789";
  const CURRENT_USER_ID = "1258";

  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copié dans le presse-papiers !");
  };

  return (
    <Container>
      <h3 className="raleway-bold">
        Informations pour la connexion au broker MQTT
      </h3>
      <ul>
        <li className="raleway-medium">
          <strong className="raleway-bold">URL :</strong> {MQTT_URL}
          <CopyIcon onClick={() => handleCopy(MQTT_URL)} />
        </li>
        <li className="raleway-medium">
          <strong raleway-bold>Nom d'utilisateur :</strong> {MQTT_USERNAME}
          <CopyIcon onClick={() => handleCopy(MQTT_USERNAME)} />
        </li>
        <li className="raleway-medium">
          <strong raleway-bold>Mot de passe :</strong>{" "}
          {showPassword ? MQTT_PASSWORD : "**************"}
          <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </PasswordToggle>
          <CopyIcon onClick={() => handleCopy(MQTT_PASSWORD)} />
        </li>
        <li className="raleway-medium">
          <strong raleway-bold>ID utilisateur :</strong> {CURRENT_USER_ID}
          <CopyIcon onClick={() => handleCopy(CURRENT_USER_ID)} />
        </li>
      </ul>
    </Container>
  );
};

export default MQTTInfo;

// Styled Components
const CopyIcon = styled(MdContentCopy)`
  cursor: pointer;
  color: #aaa;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const PasswordToggle = styled.span`
  cursor: pointer;
  margin-left: 10px;
  color: #aaa;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const Container = styled.div`
  strong {
    color: #fff;
  }
  h3 {
    //text-align: center;
    text-decoration: underline;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 10px;

      strong {
        color: #fff;
      }
    }
  }
`;
