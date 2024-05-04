import React, { useState } from 'react';

type Credentials = {
  secretKey?: string;
  publicKey?: string;
};
export type CredentialName = Credentials[keyof Credentials];

type ProviderCredentials = {
  [providerId: string]: Credentials;
};

interface ICredentialsContext {
  getCredentials: ({ providerId }: { providerId: string }) => Credentials | null;
  setCredentials: ({
    providerId,
    credentials
  }: {
    providerId: string;
    credentials: Credentials;
  }) => void;
  clearCredentials: ({ providerId }: { providerId: string }) => void;
  checkCredentialsSet: ({ providerId }: { providerId: string }) => boolean;
}
export const CredentialsContext = React.createContext<ICredentialsContext>({
  getCredentials: () => null,
  setCredentials: () => {},
  clearCredentials: () => {},
  checkCredentialsSet: () => false
});
export const CredentialsProvider = ({ children }: { children: any }) => {
  const [credentials, setCredentials] = useState<ProviderCredentials>({});

  const _getCredentials = ({ providerId }: { providerId: string }) => {
    return credentials[providerId] || null;
  };
  const _setCredentials = ({
    providerId,
    credentials
  }: {
    providerId: string;
    credentials: Credentials;
  }) => {
    setCredentials((prevProviderCredentials) => {
      return {
        ...prevProviderCredentials,
        [providerId]: credentials
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
  const _checkCredentialsSet = ({ providerId }: { providerId: string }) => {
    return !!credentials[providerId];
  };

  console.log(credentials);

  const value = {
    getCredentials: _getCredentials,
    setCredentials: _setCredentials,
    clearCredentials: _clearCredentials,
    checkCredentialsSet: _checkCredentialsSet
  };

  return <CredentialsContext.Provider value={value}>{children}</CredentialsContext.Provider>;
};
