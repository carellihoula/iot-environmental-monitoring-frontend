import { MdDashboard } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdSensors } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IMenu } from "../interface_types/interface";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { AiOutlineDashboard } from "react-icons/ai";
import { IconType } from "react-icons";
import { Sensor, SensorData } from "../interface_types/types";
import { FaTemperatureEmpty } from "react-icons/fa6";

export const Menu: IMenu[] = [
  {
    id: 1,
    title: "Tableau de bord",
    icon: MdDashboard,
  },
  {
    id: 1,
    title: "Ajout Capteur",
    icon: IoIosAddCircleOutline,
  },
  {
    id: 1,
    title: "Choix de capteurs",
    icon: MdSensors,
  },
  {
    id: 1,
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

export const sensor: Sensor = {
  id: "sensor_12345",
  name: "DHT22",
  owner_id: "user_56789",
  data: generateFakeSensorData(),
};
