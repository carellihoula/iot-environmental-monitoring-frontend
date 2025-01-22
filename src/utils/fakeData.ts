import { Sensor } from "../interface_types/types";

export const fakeData: Sensor[] = [
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
