import React, { createContext, useContext, useState, ReactNode } from "react";
import { IMenu } from "../interface_types/interface";
import { Menu } from "../utils/constants";

// Définir le type pour le contexte du menu
interface MenuContextType {
  selectedMenu: IMenu | null; // Menu actuellement sélectionné
  setSelectedMenu: (menu: IMenu) => void; // Fonction pour changer le menu
}

// Créer le contexte
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Fournisseur de contexte pour le menu
export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(Menu[0]);

  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook pour utiliser le contexte du menu
export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};
