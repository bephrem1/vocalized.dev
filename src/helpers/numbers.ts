import { isEmpty } from './empty';

export const randomInt = ({ min, max }: { min: number; max: number }) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const roundToNPlaces = ({ value, n }: { value: number; n: number }): number => {
  return parseFloat(value.toFixed(n));
};

export const commaSeparateNumber = (num: number) => {
  if (isEmpty(num)) {
    return num;
  }

  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};
