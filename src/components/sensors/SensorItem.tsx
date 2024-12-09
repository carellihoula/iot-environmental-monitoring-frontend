import React, { useState } from "react";
import styled from "styled-components";
import { Sensor } from "../../interface_types/types";
import Toggle from "../Common/Toogle";
import sensorImage from "/images/sensor1.png";

type SensorItemProps = {
  sensor: Sensor;
  onToggle: (sensorId: boolean) => void; // Gestion d'une action, comme un toggle
  initialState?: boolean;
};

const SensorItem: React.FC<SensorItemProps> = ({
  sensor,
  onToggle,
  initialState,
}) => {
  const [isOn, setIsOn] = useState(initialState);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState); // Appelle le callback si défini
    }
  };
  return (
    <SensorContainer>
      <div className="sensor__header">
        <span className="raleway-medium ">{sensor.name}</span>
        <Toggle initialState={true} onToggle={handleToggle} />
      </div>
      <img src={sensorImage} alt="sensor" className="sensor__img" />
      <button className="delete__button raleway-bold">Delete</button>
    </SensorContainer>
  );
};

export default SensorItem;

// Styled components
const SensorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  padding: 10px;
  text-align: center;
  width: 200px;
  background-color: #252525;
  color: #fff;
  box-sizing: border-box;

  .sensor__img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    //border: 1px solid #fff;
  }
  .sensor__header {
    display: flex;
    //background-color: red;
    align-items: center;
    width: 100%;
    gap: 10px;

    justify-content: space-between;
  }
  .delete__button {
    background-color: #cf1a1a;
    border-radius: 5px;
    border-style: none;
    text-align: center;
    padding: 10px;
    color: #fff;
    width: 80%;
    cursor: pointer;
    &:hover {
      background-color: #ff0000;
    }
  }
`;
