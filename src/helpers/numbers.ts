export const randomInt = ({ min, max }: { min: number; max: number }) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const roundToNPlaces = ({ value, n }: { value: number; n: number }): number => {
  return parseFloat(value.toFixed(n));
};
