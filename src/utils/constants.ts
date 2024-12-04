import { IconType } from "react-icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDashboard, MdSensors } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { IMenu } from "../interface_types/interface";
import { Sensor, SensorData } from "../interface_types/types";

export const Menu: IMenu[] = [
  {
    id: 1,
    title: "Tableau de bord",
    icon: MdDashboard,
  },
  {
    id: 2,
    title: "Ajout Capteur",
    icon: IoIosAddCircleOutline,
  },
  {
    id: 3,
    title: "Choix de capteurs",
    icon: MdSensors,
  },
  {
    id: 4,
    title: "Paramètres",
    icon: CiSettings,
  },
];

export const iconMapping: { [key: string]: IconType | string } = {
  temperature: FaTemperatureEmpty, // React-icon (type IconType)
  humidity: WiHumidity,
  pressure: AiOutlineDashboard,
  default: "❓",
};

export const generateFakeSensorData = (): SensorData => ({
  temperature: Math.floor(Math.random() * 40),
  humidity: Math.floor(Math.random() * 100),
  pressure: Math.floor(Math.random() * 50) + 950,
});

/*useEffect(() => {
  // Simulation de mise à jour des données toutes les 5 secondes
  const interval = setInterval(() => {
    generateFakeSensorData();
  }, 1000); // Met à jour toutes les 5 secondes

  return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage
}, []);*/

export const sensors: Sensor[] = [
  {
    id: "1234",
    name: "DHT22",
    owner_id: "1258_luco",
    data: {
      temperature: 22,
      humidity: 55,
    },
  },
  {
    id: "5678",
    name: "BME280",
    owner_id: "1258_carel",
    data: {
      temperature: 24,
      humidity: 45,
      pressure: 1013,
    },
  },
  {
    id: "91011",
    name: "ENSIM",
    owner_id: "1258_lihoula",
    data: {
      temperature: 19,
      humidity: 60,
      pressure: 1005,
    },
  },
];
