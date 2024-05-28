import { commaSeparateNumber } from './numbers';
import { isEmpty } from './empty';

export const pluralize = ({
  value,
  wordBase,
  withEs,
  includeOriginalFigure = true
}: {
  value: number;
  wordBase: string;
  withEs: boolean;
  includeOriginalFigure?: boolean;
}) => {
  return `${includeOriginalFigure ? `${commaSeparateNumber(value)} ` : ''}${
    value === 1 ? wordBase : `${wordBase}${withEs ? 'es' : 's'}`
  }`;
};

export const toTitlecase = (input: string): string => {
  if (isEmpty(input)) {
    return '';
  }
  input = input.trim();

  if (input.toUpperCase() === 'WEBRTC') {
    return 'WebRTC';
  }
  if (input.toUpperCase() === 'PAAS') {
    return 'PaaS';
  }

  if (
    input.toUpperCase() === 'API' ||
    input.toUpperCase() === 'TTS' ||
    input.toUpperCase() === 'STT'
  ) {
    return input.toUpperCase();
  }

  // split the string at each capital letter and around hyphens
  const words = input.split(/(?=[A-Z])|(-)/);

  // capitalize the first letter of each word and join them with a space, handling hyphens correctly
  return words
    .map((word) => {
      if (!word) {
        return '';
      }

      if (
        word.toUpperCase() === 'API' ||
        word.toUpperCase() === 'TTS' ||
        word.toUpperCase() === 'STT'
      ) {
        return word.toUpperCase();
      }

      if (word === '-') {
        // Avoid adding a space if the hyphen is part of a hyphenated word
        return '';
      }

      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};
