export const validateSensorData = (data: any): boolean => {
  // Vérifier les champs obligatoires de haut niveau
  if (
    typeof data.id !== "string" ||
    typeof data.name !== "string" ||
    typeof data.owner_id !== "string" ||
    typeof data.data !== "object" ||
    data.data === null
  ) {
    return false;
  }

  // Valider que tous les champs dans `data` sont du type `number`
  for (const key in data.data) {
    if (typeof data.data[key] !== "number") {
      console.warn(`Le champ "${key}" dans data doit être un nombre.`);
      return false;
    }
  }

  return true;
};
