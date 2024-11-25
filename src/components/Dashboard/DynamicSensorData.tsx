import React from "react";
import { iconMapping } from "../../utils/constants";
import { Sensor } from "../../interface_types/types";
import styled from "styled-components";

interface DynamicSensorDataProps {
  sensor: Sensor;
}

const DynamicSensorData: React.FC<DynamicSensorDataProps> = ({ sensor }) => {
  return (
    <Container>
      <h4>Données provenant du capteur {sensor.name}</h4>
      <SubContainer>
        {Object.entries(sensor.data).map(([key, value]) => {
          const IconOrUrl = iconMapping[key] || iconMapping["default"];

          return (
            <ContainerData key={key}>
              {/* Affiche une icône ou une image en fonction du type */}
              {/*<span style={{ marginRight: "10px" }}>
                {typeof IconOrUrl === "string" ? (
                  <img
                    src={IconOrUrl}
                    alt={`${key} icon`}
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : (
                  <IconOrUrl style={{ fontSize: "1.5rem" }} />
                )}
              </span> */}
              <DataLine>
                <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                <div className="value"> {value}</div>
              </DataLine>
            </ContainerData>
          );
        })}
      </SubContainer>
    </Container>
  );
};

export default DynamicSensorData;

const Container = styled.div`
  //background-color: red;
  width: 350px;
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
  padding: 10px 0;
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
