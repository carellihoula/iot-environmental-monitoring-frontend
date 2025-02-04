import React, { useState } from "react";
import styled from "styled-components";
import { useSensorContext } from "../../context/SensorContext";
import { Sensor } from "../../interface_types/types";
import UnitSelectorDropdown from "../measures/UnitSelectorDropdown";
import convert, { Measure, Unit } from "convert-units";
import { toExponentialIfNeeded } from "../../utils/toExponential";

interface DynamicSensorDataProps {
  sensors: Sensor[];
}

// Utility function to handle hex to little endian conversion
const hexToLittleEndian = (hex: string): number => {
  const cleanHex = hex.replace("0x", "");
  const pairs = cleanHex.match(/.{2}/g) || [];
  return parseInt(pairs.reverse().join(""), 16);
};

// Custom measures handling
const customMeasures = {
  humidity: {
    units: ["rh", "decimal"],
    convert: (value: number, from: string, to: string) => {
      if (from === to) return value;
      if (from === "rh" && to === "decimal") return value / 100;
      if (from === "decimal" && to === "rh") return value * 100;
      return value;
    },
  },
  hexLittleEndian: {
    units: ["hex", "decimal"],
    convert: (value: string | number, from: string, to: string) => {
      if (from === to) return Number(value);
      if (from === "hex" && to === "decimal") {
        return typeof value === "string" ? hexToLittleEndian(value) : value;
      }
      return Number(value);
    },
  },
};

const DynamicSensorData: React.FC<DynamicSensorDataProps> = ({ sensors }) => {
  const { visibleMeasures } = useSensorContext();
  const [selectedUnits, setSelectedUnits] = useState<Record<string, Unit>>({});

  const handleUnitChange = (sensorId: string, key: string, newUnit: Unit) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [`${sensorId}-${key}`]: newUnit,
    }));
  };

  const getAvailableUnits = (measure: string): Unit[] => {
    // Check if it's a custom measure
    if (measure in customMeasures) {
      return customMeasures[measure as keyof typeof customMeasures]
        .units as Unit[];
    }

    // Try standard convert-units
    try {
      return convert().possibilities(measure as Measure) as Unit[];
    } catch {
      return [];
    }
  };

  const convertValue = (
    value: string | number,
    measure: string,
    fromUnit: string,
    toUnit: string
  ): number => {
    try {
      // Handle custom measures
      if (measure in customMeasures) {
        return customMeasures[measure as keyof typeof customMeasures].convert(
          value as number,
          fromUnit,
          toUnit
        );
      }

      // Handle standard convert-units measures
      return convert(Number(value))
        .from(fromUnit as Unit)
        .to(toUnit as Unit);
    } catch (error) {
      console.warn("Conversion error:", error);
      return Number(value);
    }
  };

  return (
    <Container>
      {sensors.map((sensor) => {
        if (!sensor.data || !sensor.id) return null;

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
                Object.entries(sensor.data).map(([key, entry]) => {
                  if (!visibleMeasures[sensor.id!]?.[key]) return null;

                  const value = entry.value ?? "";
                  const measure = entry.measure;

                  const units = getAvailableUnits(measure || "");
                  if (units.length === 0) return null;

                  const baseUnit = units[0];
                  const selectedUnit =
                    selectedUnits[`${sensor.id}-${key}`] || baseUnit;

                  const convertedValue = convertValue(
                    value as string | number,
                    measure || "",
                    baseUnit,
                    selectedUnit
                  );

                  return (
                    <ContainerData key={`${sensor.id}-${key}`}>
                      <DataLine>
                        <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                        <div className="value">
                          {measure === "humidity"
                            ? `${toExponentialIfNeeded(convertedValue)} ${
                                selectedUnit.toString() === "rh" ? "%" : ""
                              }`
                            : toExponentialIfNeeded(convertedValue)}
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
