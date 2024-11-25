import React from "react";
import DynamicSensorData from "./DynamicSensorData";
import HandleSensor from "./HandleSensor";
import { sensor } from "../../utils/constants";

const Dashboard: React.FC = () => {
  // État pour un seul capteur

  return (
    <div style={{ padding: "10px" }}>
      <HandleSensor sensor={sensor} />
      <DynamicSensorData sensor={sensor} />
    </div>
  );
};

export default Dashboard;
