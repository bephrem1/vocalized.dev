export enum ProviderId {
  // conversation
  Vapi = 'vapi',
  Retell = 'retell',
  Bland = 'bland',
  PlayAI = 'playai',
  Hume = 'hume',
  Vocode = 'vocode',
  Sindarin = 'sindarin'
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
    documentation: string;
    dashboard?: string;
    playground?: string;
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
      documentation: 'https://docs.vapi.ai',
      dashboard: 'https://dashboard.vapi.ai',
      playground: null,
      credentials: 'https://dashboard.vapi.ai/organizations'
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
      documentation: 'https://docs.retellai.com',
      dashboard: 'https://beta.retellai.com/dashboard',
      playground: null,
      credentials: 'https://beta.retellai.com/dashboard/apiKeys'
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
      documentation: 'https://docs.bland.ai',
      dashboard: 'https://app.bland.ai/dashboard?page=home',
      playground: null,
      credentials: 'https://app.bland.ai/dashboard?page=settings'
    }
  } as IProviderData,
  PlayAI: {
    id: ProviderId.PlayAI,
    displayName: 'PlayAI',
    siteHostname: 'play.ai',
    logo: {
      localPath: '/images/logos/playai.png'
    },
    links: {
      homepage: 'https://play.ai',
      documentation: 'https://docs.play.ai',
      dashboard: 'https://play.ai/my-agents',
      playground: null,
      credentials: 'https://play.ai/developers'
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
      documentation: 'https://dev.hume.ai',
      dashboard: 'https://beta.hume.ai',
      playground: 'https://beta.hume.ai/playground/voice',
      credentials: 'https://beta.hume.ai/settings/keys'
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
      documentation: 'https://docs.vocode.dev',
      dashboard: 'https://dashboard.vocode.dev',
      playground: null,
      credentials: 'https://dashboard.vocode.dev/developers/api-keys'
    }
  } as IProviderData,
  Sindarin: {
    id: ProviderId.Sindarin,
    displayName: 'Sindarin',
    siteHostname: 'sindarin.tech',
    logo: {
      localPath: '/images/logos/sindarin.png'
    },
    links: {
      homepage: 'https://www.sindarin.tech',
      documentation:
        'https://wirehaired-caravan-e73.notion.site/Sindarin-Persona-Documentation-BETA-130182f2903742f5874cb44aaceaccb7',
      dashboard: 'https://persona-webapp-beta.vercel.app',
      playground: 'https://persona-webapp-beta.vercel.app/#',
      credentials: 'https://persona-webapp-beta.vercel.app/#'
    }
  } as IProviderData
};
