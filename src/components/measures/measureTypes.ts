// measureTypes.ts
export type CustomMeasureType = "humidity" | "hexLittleEndian" | "other";

export interface MeasureDefinition {
  type: "standard" | "custom";
  baseUnit: string;
  possibleUnits: string[];
  convert: (value: number | string, fromUnit: string, toUnit: string) => number;
  formatValue?: (value: number) => string;
}

export interface MeasureSystem {
  [key: string]: MeasureDefinition;
}

// extendedMeasures.ts
import convert, { Measure, Unit } from "convert-units";

// Fonction utilitaire pour convertir l'hex en little endian
const hexToLittleEndian = (hex: string): number => {
  const cleanHex = hex.replace("0x", "");
  const pairs = cleanHex.match(/.{2}/g) || [];
  return parseInt(pairs.reverse().join(""), 16);
};

export const extendedMeasureSystem: MeasureSystem = {
  humidity: {
    type: "custom",
    baseUnit: "rh",
    possibleUnits: ["rh", "decimal"],
    convert: (value: number | string, fromUnit: string, toUnit: string) => {
      const numValue = Number(value);
      if (fromUnit === toUnit) return numValue;
      if (fromUnit === "rh" && toUnit === "decimal") return numValue / 100;
      if (fromUnit === "decimal" && toUnit === "rh") return numValue * 100;
      return numValue;
    },
    formatValue: (value: number) => `${value}%`,
  },
  hexLittleEndian: {
    type: "custom",
    baseUnit: "hex",
    possibleUnits: ["hex", "decimal"],
    convert: (value: number | string, fromUnit: string, toUnit: string) => {
      if (fromUnit === toUnit) return Number(value);
      if (fromUnit === "hex" && toUnit === "decimal") {
        return typeof value === "string" ? hexToLittleEndian(value) : value;
      }
      return Number(value);
    },
  },
};

// Fonction utilitaire pour vérifier si une mesure est supportée
export const isSupportedMeasure = (measure: string): boolean => {
  try {
    if (measure in extendedMeasureSystem) return true;
    convert().possibilities(measure as Measure);
    return true;
  } catch {
    return false;
  }
};

// Fonction principale de conversion
export const convertExtendedMeasure = (
  value: number | string,
  measure: string,
  fromUnit: string,
  toUnit: string
): number => {
  // Si c'est une mesure personnalisée
  if (measure in extendedMeasureSystem) {
    return extendedMeasureSystem[measure].convert(value, fromUnit, toUnit);
  }

  // Si c'est une mesure standard de convert-units
  try {
    return convert(Number(value))
      .from(fromUnit as Unit)
      .to(toUnit as Unit);
  } catch (error) {
    console.warn(`Conversion failed for measure ${measure}:`, error);
    return Number(value);
  }
};

// Fonction pour obtenir les unités disponibles
export const getExtendedUnits = (measure: string): string[] => {
  // Si c'est une mesure personnalisée
  if (measure in extendedMeasureSystem) {
    return extendedMeasureSystem[measure].possibleUnits;
  }

  // Si c'est une mesure standard de convert-units
  try {
    return convert().possibilities(measure as Measure);
  } catch {
    return [];
  }
};

// Fonction pour formater la valeur selon le type de mesure
export const formatMeasureValue = (value: number, measure: string): string => {
  if (
    measure in extendedMeasureSystem &&
    extendedMeasureSystem[measure].formatValue
  ) {
    return extendedMeasureSystem[measure].formatValue!(value);
  }
  return value.toString();
};
