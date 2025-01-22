import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSensorContext } from "../../context/SensorContext";
import { Sensor } from "../../interface_types/types";
import UnitSelectorDropdown from "../measures/UnitSelectorDropdown";
import convert, { Measure, Unit } from "convert-units";
import { toExponentialIfNeeded } from "../../utils/toExponential";

interface DynamicSensorDataProps {
  sensors: Sensor[];
}

const DynamicSensorData: React.FC<DynamicSensorDataProps> = ({ sensors }) => {
  const { visibleMeasures } = useSensorContext();
  const [selectedUnits, setSelectedUnits] = useState<Record<string, Unit>>({});

  // Initialize default units for each sensor and measure
  useEffect(() => {
    const initialUnits: Record<string, Unit> = {};

    sensors.forEach((sensor) => {
      if (sensor.data && sensor.id) {
        Object.entries(sensor.data).forEach(([key, entry]) => {
          if (sensor.id && visibleMeasures[sensor.id]?.[key]) {
            try {
              const measure = entry.measure as Measure;
              const possibilities = convert().possibilities(measure);
              if (possibilities.length > 0) {
                initialUnits[`${sensor.id}-${key}`] = possibilities[0];
              }
            } catch (error) {
              console.warn(
                `Could not get possibilities for measure ${entry.measure}`
              );
            }
          }
        });
      }
    });

    setSelectedUnits((prev) => ({
      ...prev,
      ...initialUnits,
    }));
  }, [sensors, visibleMeasures]);

  const handleUnitChange = (sensorId: string, key: string, newUnit: Unit) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [`${sensorId}-${key}`]: newUnit,
    }));
  };

  const convertValue = (
    value: number,
    measure: Measure,
    fromUnit: Unit,
    toUnit: Unit
  ): number => {
    try {
      if (!toUnit) return value;
      return convert(value).from(fromUnit).to(toUnit);
    } catch (error) {
      console.warn(`Conversion error: ${error}`);
      return value;
    }
  };

  return (
    <Container>
      {sensors.map((sensor) => {
        if (!sensor.data || !sensor.id) return null;

        const allMeasuresHiddenForSensor = Object.keys(sensor.data).every(
          (key) => sensor.id && !visibleMeasures[sensor.id]?.[key]
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
                Object.entries(sensor.data).map(([key, entry]) => {
                  if (sensor.id && !visibleMeasures[sensor.id]?.[key])
                    return null;

                  const value = entry.value;
                  const measure = entry.measure as Measure;

                  let units: Unit[] = [];
                  try {
                    units = convert().possibilities(measure);
                  } catch (error) {
                    console.warn(`Could not get units for measure ${measure}`);
                    return null;
                  }

                  if (units.length === 0) return null;

                  const baseUnit = units[0];
                  const selectedUnit =
                    selectedUnits[`${sensor.id}-${key}`] || baseUnit;

                  const convertedValue =
                    typeof value === "number"
                      ? convertValue(value, measure, baseUnit, selectedUnit)
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
                            sensor.id &&
                            handleUnitChange(sensor.id, key, newUnit)
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  font-family: "Raleway", sans-serif;
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
