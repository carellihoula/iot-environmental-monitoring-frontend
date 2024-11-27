import React, { createContext, useState, useContext, ReactNode } from "react";

// Interface pour la structure du contexte
interface SensorContextType {
  visibleMeasures: { [sensorId: string]: { [measureKey: string]: boolean } };
  toggleMeasure: (sensorId: string, key: string, state: boolean) => void;
}

// Création du contexte
const SensorContext = createContext<SensorContextType | undefined>(undefined);

// Fournisseur du contexte
export const SensorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // État partagé pour suivre les mesures visibles
  const [visibleMeasures, setVisibleMeasures] = useState<{
    [sensorId: string]: { [measureKey: string]: boolean };
  }>({});

  const toggleMeasure = (
    sensorId: string,
    measureKey: string,
    state: boolean
  ) => {
    setVisibleMeasures((prev) => ({
      ...prev,
      [sensorId]: {
        ...(prev[sensorId] || {}),
        [measureKey]: state,
      },
    }));
  };

  return (
    <SensorContext.Provider value={{ visibleMeasures, toggleMeasure }}>
      {children}
    </SensorContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useSensorContext = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error("useSensorContext must be used within a SensorProvider");
  }
  return context;
};
