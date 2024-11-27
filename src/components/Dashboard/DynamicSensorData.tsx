import React from "react";
//import { iconMapping } from "../../utils/constants";
import { Sensor } from "../../interface_types/types";
import styled from "styled-components";
import { useSensorContext } from "../../context/SensorContext";

interface DynamicSensorDataProps {
  sensors: Sensor[];
}

const DynamicSensorData: React.FC<DynamicSensorDataProps> = ({ sensors }) => {
  const { visibleMeasures } = useSensorContext();

  return (
    <Container>
      {sensors.map((sensor) => {
        // Vérifier si toutes les mesures pour ce capteur sont désactivées
        const allMeasuresHiddenForSensor = Object.keys(sensor.data).every(
          (key) => !visibleMeasures[sensor.id]?.[key]
        );

        return (
          <SensorContainer key={sensor.id}>
            <h4>Données provenant du capteur {sensor.name}</h4>
            <SubContainer>
              {allMeasuresHiddenForSensor ? (
                <NoDataMessage>Aucune mesure activée</NoDataMessage>
              ) : (
                Object.entries(sensor.data).map(([key, value]) => {
                  // Ne pas afficher si la mesure est masquée
                  if (!visibleMeasures[sensor.id]?.[key]) return null;

                  return (
                    <ContainerData key={`${sensor.id}-${key}`}>
                      <DataLine>
                        <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                        <div className="value"> {value}</div>
                      </DataLine>
                    </ContainerData>
                  );
                })
              )}
            </SubContainer>
          </SensorContainer>
        );
      })}
    </Container>
  );
};

export default DynamicSensorData;

const Container = styled.div`
  //background-color: red;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  //width: 100%;
  h4 {
    color: #fff;
    margin-bottom: 10px;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const SubContainer = styled.div`
  border-radius: 10px;
  background-color: #252525;
  width: 350px;
  padding: 20px 0;
`;

const ContainerData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: auto;
  padding: 5px;

  .value {
    background: #000;
    text-align: center;
    min-width: 60px;
    height: 22px;
    padding: 8px;
    border-radius: 10px;
  }
`;

const DataLine = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  // background-color: red;
  width: 80%;
  font-size: 1.3rem;
`;

const NoDataMessage = styled.div`
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
`;
const SensorContainer = styled.div`
  width: 350px;
`;
