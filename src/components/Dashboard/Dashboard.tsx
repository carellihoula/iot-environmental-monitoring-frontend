import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMenuContext } from "../../context/MenuContext";
import AddSensor from "../sensors/AddSensor";
import SensorSelection from "../sensors/SensorSelection";
import Settings from "../sensors/Settings";
import DynamicSensorData from "./DynamicSensorData";
import HandleSensor from "./HandleSensor";
import { fakeData } from "../../utils/fakeData";
//import { useMQTTContext } from "../../context/MqttContext";

const Dashboard: React.FC = () => {
  // État pour un seul capteur
  const { selectedMenu } = useMenuContext();
  //const { sensors } = useMQTTContext();
  const [sensorsData, setSensorsData] = useState(fakeData);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setSensorsData((prevSensors) =>
        prevSensors.map((sensor) => {
          if (sensor.id === "91011") {
            return {
              ...sensor,
              data: {
                ...sensor.data,
                temperature: {
                  value: parseFloat((Math.random() * (2 - 1) + 15).toFixed(2)),
                  measure: "temperature",
                },
                humidity: {
                  value: parseFloat(
                    (Math.random() * (5 - 3.5) + 70).toFixed(2)
                  ),
                  measure: "humidity",
                },
              },
            };
          }
          return sensor;
        })
      );
    }, 2000);
    return () => clearInterval(updateInterval);
  }, []);

  const renderContent = () => {
    switch (selectedMenu?.id) {
      case 1:
        if (!sensorsData || sensorsData.length === 0) {
          return <div>Oops, aucun capteur configuré</div>;
        }
        return (
          <>
            <HandleSensor sensors={sensorsData} />
            <DynamicSensorData sensors={sensorsData} />
          </>
        );
      case 2:
        return <AddSensor />;
      case 3:
        return <SensorSelection />;
      case 4:
        return <Settings />;
    }
  };
  return <Container style={{ padding: "10px" }}>{renderContent()}</Container>;
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  height: 100%;
  //background-color: red;
  overflow-y: auto;
  margin-top: 50px;
`;
