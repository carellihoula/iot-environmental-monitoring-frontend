import React from "react";
import styled from "styled-components";
import { Sensor } from "../../interface_types/types";
import Toggle from "../Common/Toogle";
import { iconMapping } from "../../utils/constants";

interface HandleSensorProps {
  sensor: Sensor;
}

const HandleSensor: React.FC<HandleSensorProps> = ({ sensor }) => {
  const handleToggleChange = (state: boolean) => {
    console.log("Toggle state:", state);
  };
  return (
    <Container>
      <h4>Les Mesures du Capteur {sensor.name}</h4>
      <SubContainer>
        {Object.keys(sensor.data).map((key, index) => {
          console.log(key);
          const IconOrUrl = iconMapping[key] || iconMapping["default"];
          return (
            <Measures key={index}>
              <SubMeasureConatiner>
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
                <Toggle initialState={true} onToggle={handleToggleChange} />
              </SubMeasureConatiner>
            </Measures>
          );
        })}
      </SubContainer>
    </Container>
  );
};

export default HandleSensor;

const Container = styled.div`
  color: #fff;
  width: 350px;
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
const SubMeasureConatiner = styled.div`
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
