// Types pour les données du capteur
export type SensorData = {
  [key: string]: number | string | null; // Les données peuvent être des nombres ou des chaînes
};

export type Sensor = {
  id?: string;
  name: string;
  owner_id?: string;
  data: SensorData;
};
