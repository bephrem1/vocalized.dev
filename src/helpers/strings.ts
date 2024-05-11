export const toTitlecase = (input: string): string => {
  // split the string at each capital letter
  const words = input.split(/(?=[A-Z])/);

  // capitalize the first letter of each word and join them with a space
  return words
    .map((word) => {
      if (word.toLowerCase() === 'api') {
        return word.toUpperCase();
      }

      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};
