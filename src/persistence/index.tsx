import { isEmpty } from '../helpers/empty';

export const LOCAL_STORAGE_KEYS = {
  SITE_THEME: 'site-theme'
};

export const SESSION_STORAGE_KEYS = {
  PLAYGROUND: {
    MODE: 'playground:mode',
    CREDENTIALS: 'playground:credentials',
    CREDENTIALS_DRAWER_OPEN: 'playground:credentials-drawer-open',
    SYSTEM_PROMPT: 'playground:system-prompt',
    FIRST_MESSAGE: 'playground:first-message'
  }
};

export const persistData = ({
  key,
  value,
  useLocalStorage,
  useSessionStorage
}: {
  key: string;
  value: boolean | string | number | Record<string, any>;
  useLocalStorage?: boolean;
  useSessionStorage?: boolean;
}) => {
  if (isEmpty(useLocalStorage) && isEmpty(useSessionStorage)) {
    throw new Error('internal error - choose at least one persistence option');
  }

  if (!isEmpty(useLocalStorage) && !isEmpty(useSessionStorage)) {
    throw new Error('internal error - only choose 1 persistence option');
  }

  if (useLocalStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  } else if (useSessionStorage) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getPersistedData = (key: string): any | null => {
  let dataAsJsonString = localStorage.getItem(key);
  if (isEmpty(dataAsJsonString)) {
    dataAsJsonString = sessionStorage.getItem(key);
  }

  return !isEmpty(dataAsJsonString) ? JSON.parse(dataAsJsonString) : null;
};

export const removePersistedData = ({
  key,
  fromLocalStorage,
  fromSessionStorage
}: {
  key: string;
  fromLocalStorage?: boolean;
  fromSessionStorage?: boolean;
}) => {
  if (isEmpty(fromLocalStorage) && isEmpty(fromLocalStorage)) {
    throw new Error('internal error - choose at least one persistence option for removal');
  }

  if (!isEmpty(fromSessionStorage) && !isEmpty(fromSessionStorage)) {
    throw new Error('internal error - only choose 1 persistence optio for removaln');
  }

  if (fromLocalStorage) {
    localStorage.removeItem(key);
  } else if (fromSessionStorage) {
    sessionStorage.removeItem(key);
  }
};

export const wipeAllStorage = () => {
  sessionStorage.clear();
  localStorage.clear();
};
