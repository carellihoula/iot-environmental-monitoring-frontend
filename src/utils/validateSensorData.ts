import { Sensor } from "../interface_types/types";

export const validateSensorData = (sensor: Sensor): boolean => {
  // Vérifier les champs obligatoires de haut niveau
  if (
    typeof sensor.id !== "string" ||
    typeof sensor.name !== "string" ||
    typeof sensor.owner_id !== "string" ||
    typeof sensor.data !== "object" ||
    sensor.data === null
  ) {
    console.warn("Champs obligatoires manquants ou invalides");
    return false;
  }

  // Valider la structure des données dans l'objet data
  for (const key in sensor.data) {
    const measurement = sensor.data[key];

    // Vérifier que chaque mesure est un objet avec les propriétés requises
    if (
      typeof measurement !== "object" ||
      measurement === null ||
      !("value" in measurement)
    ) {
      console.warn(`Mesure "${key}" invalide: structure incorrecte`);
      return false;
    }

    // Vérifier que la valeur est soit un nombre, soit une chaîne, soit null
    if (
      !(
        typeof measurement.value === "number" ||
        typeof measurement.value === "string" ||
        measurement.value === null
      )
    ) {
      console.warn(`Valeur invalide pour la mesure "${key}"`);
      return false;
    }

    // Vérifier que measure est une chaîne si elle est présente
    if ("measure" in measurement && typeof measurement.measure !== "string") {
      console.warn(`Type de mesure invalide pour "${key}"`);
      return false;
    }
  }

  return true;
};
