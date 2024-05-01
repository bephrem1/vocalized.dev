import { LOCAL_STORAGE_KEYS, getPersistedData } from '../../persistence';

export const SITE_THEME = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const isThemeEnabled = (theme: string) =>
  getPersistedData(LOCAL_STORAGE_KEYS.SITE_THEME) === theme;
