import { Sensor } from "../interface_types/types";

/* export const fakeData: Sensor[] = [
  {
    id: "1234",
    name: "DHT22",
    owner_id: "1258_luco",
    data: {
      mass: {
        value: 22,
        measure: "mass",
      },
      speed: {
        value: 22,
        measure: "speed",
      },
      humidity: {
        value: 22,
        measure: "humidity",
      },
    },
  },
  {
    id: "5678",
    name: "BME280",
    owner_id: "1258_carel",
    data: {
      temperature: {
        value: 24,
        measure: "temperature",
      },
      mass: {
        value: 45,
        measure: "mass",
      },
      hexValue3: {
        value: "0xFFEE", // En decimal: 61439 (après conversion little endian)
        measure: "hexLittleEndian",
      },
    },
  },
  {
    id: "91011",
    name: "ENSIM",
    owner_id: "1258_lihoula",
    data: {
      temperature: {
        value: 19,
        measure: "temperature",
      },
      pressure: {
        value: 1013,
        measure: "pressure",
      },
    },
  },
];
*/

export const fakeData: Sensor[] = [
  {
    id: "91011",
    name: "ENSIM",
    owner_id: "1258_lihoula",
    data: {
      temperature: {
        value: 15,
        measure: "temperature",
      },
      humidity: {
        value: 60,
        measure: "humidity",
      },
    },
  },
];

/*// Simuler la mise à jour des données pour l'objet ENSIM
const updateInterval = 2000; // 2 secondes
setInterval(() => {
  const ensimSensor = fakeData.find((sensor) => sensor.id === "91011");

  if (ensimSensor) {
    // Mettre à jour les valeurs de température et d'humidité
    ensimSensor.data.temperature = {
      value: parseFloat((Math.random() * (30 - 15) + 15).toFixed(2)), // Température entre 15 et 30°C
      measure: "temperature",
    };
    ensimSensor.data.humidity = {
      value: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)), // Humidité entre 20% et 100%
      measure: "humidity",
    };

    console.log("Données mises à jour pour ENSIM:", ensimSensor);
  }
}, updateInterval);*/
