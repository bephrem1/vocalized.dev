import React, { useState } from 'react';

type Credentials = {
  [providerId: string]: {
    apiKey: string;
  };
};

interface ICredentialsContext {
  getCredentials: ({ providerId }: { providerId: string }) => { apiKey: string } | null;
  setCredentials: ({ providerId, apiKey }: { providerId: string; apiKey: string }) => void;
  clearCredentials: ({ providerId }: { providerId: string }) => void;
}
export const CredentialsContext = React.createContext<ICredentialsContext>({
  getCredentials: () => null,
  setCredentials: () => {},
  clearCredentials: () => {}
});
export const CredentialsProvider = ({ children }: { children: any }) => {
  const [credentials, setCredentials] = useState<Credentials>({});

  const _getCredentials = ({ providerId }: { providerId: string }) => {
    return credentials[providerId] || null;
  };
  const _setCredentials = ({ providerId, apiKey }: { providerId: string; apiKey: string }) => {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [providerId]: { apiKey }
      };
    });
  };
  const _clearCredentials = ({ providerId }: { providerId: string }) => {
    setCredentials((prevCredentials) => {
      const newCredentials = { ...prevCredentials };
      delete newCredentials[providerId];

      return newCredentials;
    });
  };

  const value = {
    getCredentials: _getCredentials,
    setCredentials: _setCredentials,
    clearCredentials: _clearCredentials
  };

  return <CredentialsContext.Provider value={value}>{children}</CredentialsContext.Provider>;
};