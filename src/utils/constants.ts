import { MdDashboard } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdSensors } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IMenu } from "../interface_types/interface";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { AiOutlineDashboard } from "react-icons/ai";
import { IconType } from "react-icons";

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
  temperature: FaTemperatureHigh, // React-icon (type IconType)
  humidity: WiHumidity,
  pressure: AiOutlineDashboard,
  default: "❓",
};
