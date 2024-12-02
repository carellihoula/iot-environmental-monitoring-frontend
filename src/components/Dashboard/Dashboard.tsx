import React from "react";
import styled from "styled-components";
import { useMenuContext } from "../../context/MenuContext";
import { sensors } from "../../utils/constants";
import AddSensor from "../sensors/AddSensor";
import SensorSelection from "../sensors/SensorSelection";
import Settings from "../sensors/Settings";
import DynamicSensorData from "./DynamicSensorData";
import HandleSensor from "./HandleSensor";

const Dashboard: React.FC = () => {
  // État pour un seul capteur
  const { selectedMenu } = useMenuContext();
  //const { sensors } = useMQTTContext();

  const renderContent = () => {
    switch (selectedMenu?.id) {
      case 1:
        if (!sensors || sensors.length === 0) {
          return <div>Oops, aucun capteur configuré</div>;
        }
        return (
          <>
            <HandleSensor sensors={sensors} />
            <DynamicSensorData sensors={sensors} />
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
  margin-top: 50px;
`;
