import { IconType } from "react-icons";

export interface IMenu {
  id: number;
  title: string;
  icon: IconType;
}

export interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  width?: string;
  height?: string;
  margin?: string;
  icon?: React.ReactNode;
}
