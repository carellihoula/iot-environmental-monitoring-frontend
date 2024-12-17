import { Buffer } from "buffer"; // Nécessaire si 'Buffer' est utilisé
import mqtt, { MqttClient } from "mqtt";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { validateSensorData } from "../utils/validateSensorData";

// Types pour les données des capteurs
export interface SensorData {
  id: string;
  name: string;
  owner_id: string;
  data: Record<string, number | string>;
}

// Types du contexte MQTT
interface MQTTContextType {
  sensors: SensorData[]; // Liste des capteurs
}

// Créer le contexte MQTT
const MQTTContext = createContext<MQTTContextType | undefined>(undefined);

export const MQTTProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mqttUrl = process.env.MQTT_URL;
    const mqttUsername = process.env.MQTT_USERNAME;
    const mqttPassword = process.env.MQTT_PASSWORD;

    if (!mqttUrl || !mqttUsername || !mqttPassword) {
      console.error("Missing MQTT configuration values.");
      return;
    }
    const client: MqttClient = mqtt.connect(mqttUrl, {
      username: mqttUsername,
      password: mqttPassword,
    });

    // S'abonner au topic spécifique à l'utilisateur
    const topic = `iotensim/${process.env.CURRENT_USER_ID}/data`;
    //const topic = `esp32/frontend/data`;
    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(topic, (err: Error | null) => {
        if (err) console.error("Failed to subscribe to topic:", err);
        else console.log("Subscribed to topic:", topic);
      });
    });

    // Traiter les messages reçus
    client.on("message", (_topic: string, message: Buffer) => {
      try {
        const sensorData: SensorData = JSON.parse(message.toString());
        if (!validateSensorData(sensorData)) {
          setError(
            `Le JSON reçu est invalide. Format recommandé : {"id":"string","name":"string","owner_id":"string","data":{"field1":number,"field2":number,...}}`
          );
          console.log(error);
          return;
        }

        // Si le JSON est valide, mettre à jour les capteurs
        setError(null);
        setSensors((prevSensors) => {
          const sensorIndex = prevSensors.findIndex(
            (sensor) => sensor.id === sensorData.id
          );

          if (sensorIndex !== -1) {
            // Mettre à jour les données du capteur existant
            const updatedSensors = [...prevSensors];
            updatedSensors[sensorIndex] = {
              ...updatedSensors[sensorIndex],
              ...sensorData,
            };
            return updatedSensors;
          } else {
            // Ajouter un nouveau capteur
            return [...prevSensors, sensorData];
          }
        });
      } catch (err) {
        console.error("Failed to parse MQTT message:", err);
      }
    });

    // Nettoyage à la déconnexion
    return () => {
      client.end();
    };
  }, []);

  return (
    <MQTTContext.Provider value={{ sensors }}>{children}</MQTTContext.Provider>
  );
};

// Hook pour accéder au contexte MQTT
export const useMQTTContext = (): MQTTContextType => {
  const context = useContext(MQTTContext);
  if (!context) {
    throw new Error("useMQTTContext must be used within an MQTTProvider");
  }
  return context;
};
