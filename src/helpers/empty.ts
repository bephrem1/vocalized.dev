export const isEmptyObject = (obj: any): boolean => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEmptyArray = (arr: any[]): boolean => {
  return arr && Array.isArray(arr) && arr.length === 0;
};

export const isEmpty = (value: any): boolean => {
  return (
    (value === null ||
      value === undefined ||
      value === '' ||
      isEmptyObject(value) ||
      isEmptyArray(value)) &&
    value !== false
  );
};
