import React, { useState } from "react";
import styled from "styled-components";
import MQTTInfo from "../Common/MQTTInfo";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"general" | "mqtt">("general");

  return (
    <SettingsContainer>
      {/* Tabs Header */}
      <Tabs>
        <Tab
          active={activeTab === "general"}
          onClick={() => setActiveTab("general")}
          className="raleway-bold"
        >
          Général
        </Tab>
        <Tab
          active={activeTab === "mqtt"}
          onClick={() => setActiveTab("mqtt")}
          className="raleway-bold"
        >
          Infos MQTT
        </Tab>
      </Tabs>

      {/* Tabs Content */}
      <TabContent>
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "mqtt" && <MQTTInfo />}
      </TabContent>
    </SettingsContainer>
  );
};

export default Settings;

// Composant pour les paramètres généraux
const GeneralSettings: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mot de passe changé :", passwordData);
  };

  return (
    <div>
      <h3>Modifier le profil</h3>
      <form>
        <label>
          Email :
          <input type="email" placeholder="Entrez votre email" />
        </label>
        <label>
          Nom d'utilisateur :
          <input type="text" placeholder="Entrez votre nom d'utilisateur" />
        </label>
        <button className="btn" type="submit">
          Sauvegarder
        </button>
      </form>

      <h3>Changer le mot de passe</h3>
      <form onSubmit={handlePasswordSubmit}>
        <label>
          Mot de passe actuel :
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Entrez votre mot de passe actuel"
          />
        </label>
        <label>
          Nouveau mot de passe :
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            placeholder="Entrez un nouveau mot de passe"
          />
        </label>
        <label>
          Confirmez le mot de passe :
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirmez le nouveau mot de passe"
          />
        </label>
        <button className="btn" type="submit">
          Changer le mot de passe
        </button>
      </form>
    </div>
  );
};

// Styled Components
const SettingsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #252525;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  border-bottom: 1px solid #444;
`;

interface TabProps {
  active: boolean;
}
const Tab = styled.div<TabProps>`
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => (props.active ? "#fff" : "#aaa")};
  border-bottom: ${(props) => (props.active ? "3px solid #3c1bd1" : "none")};

  &:hover {
    color: #fff;
  }
`;

const TabContent = styled.div`
  padding: 20px;
  //background-color: #1e1e1e;
  border-radius: 10px;

  h3 {
    margin-bottom: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    label {
      display: flex;
      flex-direction: column;
      font-size: 1rem;
    }

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: #333;
      color: #fff;
    }

    .btn {
      background-color: #3c1bd1;
      color: #fff;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #2e02f5;
      }
    }
  }
`;
