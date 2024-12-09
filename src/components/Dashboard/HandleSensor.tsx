import React, { useEffect } from "react";
import styled from "styled-components";
import { useSensorContext } from "../../context/SensorContext";
import { Sensor } from "../../interface_types/types";
import { iconMapping } from "../../utils/constants";
import Toggle from "../Common/Toogle";

interface HandleSensorProps {
  sensors: Sensor[];
}

const HandleSensor: React.FC<HandleSensorProps> = ({ sensors }) => {
  const { toggleMeasure } = useSensorContext();

  // Initialiser toutes les mesures comme visibles au montage du composant
  useEffect(() => {
    sensors.forEach((sensor) => {
      Object.keys(sensor.data).forEach((key) => {
        toggleMeasure(sensor.id!, key, true); // Toutes les mesures sont visibles par défaut
      });
    });
  }, []);
  return (
    <Container>
      {sensors.map((sensor) => (
        <SensorContainer key={sensor.id}>
          <h4>Les Mesures du Capteur {sensor.name}</h4>
          <SubContainer>
            {Object.keys(sensor.data).map((key, index) => {
              const IconOrUrl = iconMapping[key] || iconMapping["default"];
              return (
                <Measures key={index}>
                  <SubMeasureContainer>
                    <div className="measure">
                      <span style={{ marginRight: "10px" }}>
                        {typeof IconOrUrl === "string" ? (
                          <img
                            src={IconOrUrl}
                            alt={`${key} icon`}
                            style={{ width: "20px", height: "20px" }}
                          />
                        ) : (
                          <IconOrUrl size={30} color="#FFF" />
                        )}
                      </span>
                      <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                    </div>
                    <Toggle
                      initialState={true}
                      onToggle={(state) =>
                        toggleMeasure(sensor.id!, key, state)
                      }
                    />
                  </SubMeasureContainer>
                </Measures>
              );
            })}
          </SubContainer>
        </SensorContainer>
      ))}
    </Container>
  );
};

export default HandleSensor;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  font-family: "Raleway", sans-serif;
  color: #fff;
  width: 80%;
  //background-color: blue; //= > debug
  h4 {
    color: #fff;
    margin-bottom: 10px;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const Measures = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-items: center;
  justify-content: center;
`;

const SubContainer = styled.div`
  border-radius: 10px;
  background-color: #252525;
  width: 350px;
  padding: 20px 0;
`;
const SubMeasureContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  font-size: 1.3rem;
  .measure {
    display: flex;
    gap: 5px;
  }
`;

const SensorContainer = styled.div`
  //background-color: blue; //=> debug
  width: 350px;
`;
