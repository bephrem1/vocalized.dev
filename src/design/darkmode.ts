import { LOCAL_STORAGE_KEYS, getPersistedData, persistData } from '../persistence';
import { SITE_THEME, isThemeEnabled } from './core/theme';
import { useEffect, useState } from 'react';

interface UseDarkmodeEnabledReturn {
  darkmodeEnabled: boolean;
  setDarkmodeEnabled: (_: boolean) => void;
}
export const useDarkmodeEnabled = (): UseDarkmodeEnabledReturn => {
  const { applicationDarkmodeEnabled, setApplicationDarkmodeEnabled } =
    useApplicationDarkmodeEnabled();
  const { browserDarkmodePreferred } = useBrowserDarkmodePreferred();

  /**
   * Listen for the browser's preference & hard-set application preference.
   */
  useEffect(() => {
    if (browserDarkmodePreferred) {
      setApplicationDarkmodeEnabled(true);
    }
  }, [browserDarkmodePreferred]);

  return {
    darkmodeEnabled: applicationDarkmodeEnabled,
    setDarkmodeEnabled: setApplicationDarkmodeEnabled
  };
};

/**
 * Darkmode set at the application level — persisted in local storage.
 */
export const useApplicationDarkmodeEnabled = () => {
  const [applicationDarkmodeEnabled, setApplicationDarkmodeEnabled] = useState<boolean>(true);
  useEffect(() => {
    const siteThemeSet = !!getPersistedData(LOCAL_STORAGE_KEYS.SITE_THEME);

    if (siteThemeSet) {
      const darkEnabledFromPersistence = isThemeEnabled(SITE_THEME.DARK);

      setApplicationDarkmodeEnabled(darkEnabledFromPersistence);
    }
  }, []);

  const set = (enabled: boolean) => {
    setApplicationDarkmodeEnabled(enabled);

    persistData({
      key: LOCAL_STORAGE_KEYS.SITE_THEME,
      value: enabled ? SITE_THEME.DARK : SITE_THEME.LIGHT,
      useLocalStorage: true
    });
  };

  return { applicationDarkmodeEnabled, setApplicationDarkmodeEnabled: set };
};

/**
 * Darkmode preference at the OS level (which the browser heedss).
 */
const useBrowserDarkmodePreferred = () => {
  const [browserDarkmodePreferred, setBrowserDarkmodePreferred] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setBrowserDarkmodePreferred(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setBrowserDarkmodePreferred(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return { browserDarkmodePreferred };
};
