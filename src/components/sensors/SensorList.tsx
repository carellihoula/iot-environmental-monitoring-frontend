import React, { useState } from "react";
import styled from "styled-components";

import SensorItem from "./SensorItem";
import { fakeData } from "../../utils/fakeData";

// Composant principal
const SensorList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // Gestion du toggle pour un capteur
  const handleToggle = (sensorId: boolean | undefined) => {
    if (!sensorId) return;
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <Container
      style={{ backgroundColor: "#000", color: "#fff", padding: "20px" }}
    >
      <h2 className="raleway-bold ">Capteurs</h2>
      <SensorGrid>
        {fakeData.map((sensor) => (
          <SensorItem key={sensor.id} sensor={sensor} onToggle={handleToggle} />
        ))}
      </SensorGrid>
    </Container>
  );
};

export default SensorList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 0.1px solid #818080;
  border-radius: 15px;
  width: 70%;
  height: auto;
`;

const SensorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  column-gap: 30px;
  row-gap: 10px;

  justify-content: flex-start;
  align-content: center;
  justify-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;
