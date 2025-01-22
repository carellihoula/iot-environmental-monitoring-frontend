export const toExponentialIfNeeded = (value: number) => {
  if (value > 10000 || value < 0.001) {
    // Formatage en notation scientifique
    const scientific = value.toExponential(2); //  exemple de sortie : "2.00e+4"

    return scientific;
  }
  return value.toFixed(2);
};
