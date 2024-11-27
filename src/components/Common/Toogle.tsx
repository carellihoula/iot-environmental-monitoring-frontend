import React, { useState } from "react";
import styled from "styled-components";

interface ToggleProps {
  initialState?: boolean; // État initial du toggle
  onToggle?: (state: boolean) => void; // Callback pour notifier l'état actuel
}

const Toggle: React.FC<ToggleProps> = ({ initialState = false, onToggle }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState); // Appelle le callback si défini
    }
  };

  return (
    <ToggleContainer $isOn={isOn} onClick={handleToggle}>
      <ToggleButton $isOn={isOn} />
    </ToggleContainer>
  );
};

export default Toggle;

// Conteneur du toggle
const ToggleContainer = styled.div<{ $isOn: boolean }>`
  width: 40px;
  height: 20px;
  border-radius: 50px;
  background: ${(props) =>
    props.$isOn ? "linear-gradient(to right, #EDBAFF, #A1FFFF)" : "#FFF"};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isOn ? "flex-end" : "flex-start")};
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

// Bouton du toggle
const ToggleButton = styled.div<{ $isOn: boolean }>`
  width: 22px;
  height: 22px;
  background: ${(props) => (props.$isOn ? "#3bc229" : "#000")};
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;
