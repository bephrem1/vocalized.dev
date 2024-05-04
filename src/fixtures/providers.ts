export enum ProviderId {
  // conversation
  Vapi = 'vapi',
  Retell = 'retell',
  Bland = 'bland',
  Hume = 'hume',
  Vocode = 'vocode'
}

interface IProviderData {
  id: ProviderId;
  displayName: string;
  logo: {
    localPath: string;
  };
  links: {
    homepage: string;
    credentials: string;
  };
}

export const Providers = {
  Vapi: {
    id: ProviderId.Vapi,
    displayName: 'Vapi',
    logo: {
      localPath: '/images/logos/vapi.png'
    },
    links: {
      homepage: 'https://vapi.ai/',
      credentials: 'https://dashboard.vapi.ai/account'
    }
  } as IProviderData
};
