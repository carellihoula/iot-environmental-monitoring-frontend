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
    title: "Ajout Dispositif",
    icon: IoIosAddCircleOutline,
  },
  {
    id: 3,
    title: "Choix de Dispositifs",
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
