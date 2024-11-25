import React, { useState, useEffect } from "react";
import { Sensor, SensorData } from "../../interface_types/types";
import DynamicSensorData from "./DynamicSensorData";

const generateFakeSensorData = (): SensorData => ({
  temperature: Math.floor(Math.random() * 40),
  humidity: Math.floor(Math.random() * 100),
  pressure: Math.floor(Math.random() * 50) + 950,
});

const Dashboard: React.FC = () => {
  // État pour un seul capteur
  const [sensor, setSensor] = useState<Sensor>({
    id: "sensor_12345",
    name: "DHT22",
    owner_id: "user_56789",
    data: generateFakeSensorData(),
  });

  useEffect(() => {
    // Simulation de mise à jour des données toutes les 5 secondes
    const interval = setInterval(() => {
      setSensor((prevSensor) => ({
        ...prevSensor,
        data: generateFakeSensorData(),
      }));
    }, 5000); // Met à jour toutes les 5 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <DynamicSensorData sensor={sensor} />
    </div>
  );
};

export default Dashboard;
