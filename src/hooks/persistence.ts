import { getPersistedData, persistData } from '../persistence';
import { useEffect, useState } from 'react';

import { isEmpty } from '../helpers/empty';

export const usePersistedValue = <T>({
  defaultValue,
  persistenceKey,
  useSessionStorage,
  useLocalStorage
}: {
  defaultValue: T;
  persistenceKey: string;
  useSessionStorage?: boolean;
  useLocalStorage?: boolean;
}) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [cacheChecked, setCacheChecked] = useState(false);

  useEffect(() => {
    const persistedValue = getPersistedData(persistenceKey);
    if (!isEmpty(persistedValue)) {
      setValue(persistedValue);
    }

    setCacheChecked(true);
  }, []);
  useEffect(() => {
    if (cacheChecked) {
      persistData({
        key: persistenceKey,
        value,
        ...(!isEmpty(useSessionStorage) ? { useSessionStorage } : {}),
        ...(!isEmpty(useLocalStorage) ? { useLocalStorage } : {})
      });
    }
  }, [value]);

  return { value, setValue };
};
