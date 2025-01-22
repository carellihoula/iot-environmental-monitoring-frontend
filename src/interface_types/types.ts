// Types pour les données du capteur
export type SensorData = {
  [key: string]: {
    value: number | string | null;
    measure?: string;
  };
};

export type Sensor = {
  id?: string;
  name: string;
  owner_id?: string;
  data: SensorData;
};
