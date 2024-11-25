type Measure = {
  name: string; // Nom de la mesure
  units: string[]; // Liste des unités disponibles
  defaultUnit: string; // Unité par défaut
  convert: (value: number, fromUnit: string, toUnit: string) => number; // Fonction de conversion
};

// Table des mesures
export const measures: { [key: string]: Measure } = {
  temperature: {
    name: "Temperature",
    units: ["°C", "°F", "K"], // Celsius, Fahrenheit, Kelvin
    defaultUnit: "°C",
    convert: (value, fromUnit, toUnit) => {
      if (fromUnit === "°C" && toUnit === "°F") return value * 1.8 + 32;
      if (fromUnit === "°C" && toUnit === "K") return value + 273.15;
      if (fromUnit === "°F" && toUnit === "°C") return (value - 32) / 1.8;
      if (fromUnit === "°F" && toUnit === "K")
        return (value + 459.67) * (5 / 9);
      if (fromUnit === "K" && toUnit === "°C") return value - 273.15;
      if (fromUnit === "K" && toUnit === "°F") return value * (9 / 5) - 459.67;
      return value; // Si les unités sont identiques
    },
  },
  pressure: {
    name: "Pressure",
    units: ["hPa", "atm", "Pa"], // Hectopascal, atmosphère, Pascal
    defaultUnit: "hPa",
    convert: (value, fromUnit, toUnit) => {
      const conversionRates: { [key: string]: number } = {
        hPa: 1,
        atm: 1013.25,
        Pa: 0.01,
      };
      return (value * conversionRates[toUnit]) / conversionRates[fromUnit];
    },
  },
  humidity: {
    name: "Humidity",
    units: ["%"], // Unité unique : pourcentage
    defaultUnit: "%",
    convert: (value) => value, // Pas de conversion nécessaire
  },
  wind: {
    name: "Wind Speed",
    units: ["m/s", "km/h", "mph"], // Mètres par seconde, kilomètres par heure, miles par heure
    defaultUnit: "m/s",
    convert: (value, fromUnit, toUnit) => {
      const conversionRates: { [key: string]: number } = {
        "m/s": 1,
        "km/h": 3.6,
        mph: 2.23694,
      };
      return (value * conversionRates[toUnit]) / conversionRates[fromUnit];
    },
  },
};
