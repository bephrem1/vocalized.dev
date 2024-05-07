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
  siteHostname: string;
  logo: {
    localPath: string;
  };
  links: {
    homepage: string;
    dashboard?: string;
    credentials: string;
  };
}

export const Providers = {
  Vapi: {
    id: ProviderId.Vapi,
    displayName: 'Vapi',
    siteHostname: 'vapi.ai',
    logo: {
      localPath: '/images/logos/vapi.png'
    },
    links: {
      homepage: 'https://vapi.ai',
      dashboard: 'https://dashboard.vapi.ai',
      credentials: 'https://dashboard.vapi.ai/vapi-api'
    }
  } as IProviderData,
  Retell: {
    id: ProviderId.Retell,
    displayName: 'Retell',
    siteHostname: 'retellai.com',
    logo: {
      localPath: '/images/logos/retell.png'
    },
    links: {
      homepage: 'https://www.retellai.com',
      dashboard: '',
      credentials: ''
    }
  } as IProviderData,
  Bland: {
    id: ProviderId.Bland,
    displayName: 'Bland',
    siteHostname: 'bland.ai',
    logo: {
      localPath: '/images/logos/bland.png'
    },
    links: {
      homepage: 'https://www.bland.ai',
      dashboard: '',
      credentials: ''
    }
  } as IProviderData,
  Hume: {
    id: ProviderId.Hume,
    displayName: 'Hume',
    siteHostname: 'hume.ai',
    logo: {
      localPath: '/images/logos/hume.png'
    },
    links: {
      homepage: 'https://www.hume.ai',
      dashboard: '',
      credentials: ''
    }
  } as IProviderData,
  Vocode: {
    id: ProviderId.Vocode,
    displayName: 'Vocode',
    siteHostname: 'vocode.dev',
    logo: {
      localPath: '/images/logos/vocode.png'
    },
    links: {
      homepage: 'https://www.vocode.dev',
      dashboard: '',
      credentials: ''
    }
  } as IProviderData
};
