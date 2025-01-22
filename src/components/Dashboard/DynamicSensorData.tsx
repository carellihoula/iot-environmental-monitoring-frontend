import React, { useState } from "react";
//import { iconMapping } from "../../utils/constants";
import styled from "styled-components";
import { useSensorContext } from "../../context/SensorContext";
import { Sensor } from "../../interface_types/types";
import UnitSelectorDropdown from "../measures/UnitSelectorDropdown";
import convert, { Unit } from "convert-units";
import { toExponentialIfNeeded } from "../../utils/toExponential";

interface DynamicSensorDataProps {
  sensors: Sensor[];
}
const DynamicSensorData: React.FC<DynamicSensorDataProps> = ({ sensors }) => {
  const { visibleMeasures } = useSensorContext();
  const units: Unit[] = convert().from("kg").possibilities();

  // Utiliser un état global pour stocker les unités sélectionnées
  const [selectedUnits, setSelectedUnits] = useState<Record<string, Unit>>({});

  const handleUnitChange = (sensorId: string, key: string, newUnit: Unit) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [`${sensorId}-${key}`]: newUnit,
    }));
  };

  return (
    <Container>
      {sensors.map((sensor) => {
        const allMeasuresHiddenForSensor = Object.keys(sensor.data).every(
          (key) => !visibleMeasures[sensor.id!]?.[key]
        );

        return (
          <SensorContainer key={sensor.id}>
            <h4 className="text-blue-600">
              Données provenant du capteur {sensor.name}
            </h4>

            <SubContainer>
              {allMeasuresHiddenForSensor ? (
                <NoDataMessage>Aucune mesure activée</NoDataMessage>
              ) : (
                Object.entries(sensor.data).map(([key, value]) => {
                  if (!visibleMeasures[sensor.id!]?.[key]) return null;

                  const selectedUnit =
                    selectedUnits[`${sensor.id}-${key}`] || "kg";

                  const convertedValue =
                    typeof value === "number"
                      ? convert(value).from("kg").to(selectedUnit)
                      : 0;

                  return (
                    <ContainerData key={`${sensor.id}-${key}`}>
                      <DataLine>
                        <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                        <div className="value">
                          {toExponentialIfNeeded(convertedValue)}
                        </div>
                        <UnitSelectorDropdown
                          units={units}
                          selectedUnit={selectedUnit}
                          onUnitChange={(newUnit: Unit) =>
                            handleUnitChange(sensor.id!, key, newUnit)
                          }
                        />
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
  font-family: "Raleway", sans-serif;
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
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    text-align: center;
    min-width: 60px;
    max-width: 100px;
    height: auto;
    padding: 8px;
    border-radius: 10px;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1rem;
  }
`;

const DataLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  // background-color: red;
  width: 80%;
  font-size: 1.3rem;
  .units {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    background: #000;
    min-width: 90px;
    max-width: 100px;
    height: 22px;
    padding: 8px;
    border-radius: 10px;
    .selector_units {
      display: flex;
      flex-direction: column;
      background-color: #000;
      padding: 8px;
      border-radius: 10px;

      position: absolute;
      bottom: 0;
    }
    .truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 80%;
    }
  }
`;

const NoDataMessage = styled.div`
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
`;
const SensorContainer = styled.div`
  width: 350px;
`;
