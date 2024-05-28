import { Empty } from '../types/empty';

export enum ProjectCategory {
  API = 'api',
  ContactCenter = 'contact-center',
  FoundationalModels = 'models',
  Infrastructure = 'infra',
  Interviews = 'interviews',
  Meetings = 'meetings',
  OpenSource = 'open-source',
  PhoneCalling = 'phone',
  PaaS = 'paas',
  RealtimeConversation = 'conversation',
  Receptionists = 'receptionists',
  Sales = 'sales',
  SpeechToText = 'STT',
  Telecom = 'telecom',
  TextToSpeech = 'TTS',
  Translation = 'translation',
  WebRTC = 'webrtc',
  Workflows = 'workflows'
}

export interface IProjectData {
  id: string;
  slug: string;
  displayName: string;
  tagline?: string;
  foundedOn?: string;
  description?: {
    short?: string;
    long?: string;
  };
  siteHostname: string;
  logo: {
    localPath: string;
  };
  siteLinks: {
    homepage: string;
    documentation?: string;
    dashboard?: string;
    playground?: string;
    credentials?: string;
  };
  socials?: {
    discord?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  founders?: Array<{
    name: string;
    role?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    preferTwitterUrl?: boolean;
  }>;
  timelineNotes?: Record<string, string>;
  githubRepositories?: Array<string>;
  specialUrls?: Array<string>;
  tags?: Array<ProjectCategory>;
  lastUpdatedAt?: string;
}

export const Projects = {
  // A
  Anyscale: {
    id: 'anyscale',
    slug: 'anyscale',
    displayName: 'Anyscale',
    description: {
      short:
        'A fully-managed scalable compute platform built on Ray that enables any organization and any AI developer to effortlessly build, tune, train and scale AI/ML and Python workloads.'
    },
    siteHostname: 'anyscale.com',
    logo: {
      localPath: '/images/logos/anyscale.png'
    },
    siteLinks: {
      homepage: 'https://www.anyscale.com/'
    },
    tags: [ProjectCategory.Infrastructure],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Apriora: {
    id: 'apriora',
    slug: 'apriora',
    displayName: 'Apriora',
    tagline: 'Hire the best candidates faster.',
    foundedOn: 'late 2023',
    description: {
      short:
        'Conduct live interviews with AI recruiters to screen more candidates and make better hiring decisions.'
    },
    siteHostname: 'apriora.ai',
    logo: {
      localPath: '/images/logos/apriora.png'
    },
    siteLinks: {
      homepage: 'https://www.apriora.ai'
    },
    socials: {
      linkedin: 'https://www.linkedin.com/company/apriora',
      twitter: 'https://x.com/aprioraai'
    },
    founders: [
      {
        name: 'Aaron Wang',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/aaronjwang',
        twitterUrl: 'https://x.com/rnjnwng'
      },
      {
        name: 'John Rytel',
        linkedinUrl: 'https://www.linkedin.com/in/johnrytel',
        twitterUrl: 'https://x.com/johnrytel'
      }
    ],
    timelineNotes: {
      'May 15, 2024': `
        Apriora raises a $2.8M seed round, led by 1984 Ventures with participation from Y Combinator, HOF Capital, Pioneer Fund, and several angel investors.
      `
    },
    tags: [ProjectCategory.Interviews],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // B
  Baseten: {
    id: 'baseten',
    slug: 'baseten',
    displayName: 'Baseten',
    tagline: 'Fast & Scalable Cloud Inference.',
    description: {
      short: 'Fast, scalable inference for ML models in the Baseten cloud, or self-hosted.'
    },
    siteHostname: 'baseten.co',
    logo: {
      localPath: '/images/logos/baseten.png'
    },
    siteLinks: {
      homepage: 'https://www.baseten.co'
    },
    tags: [ProjectCategory.Infrastructure],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Botpress: {
    id: 'botpress',
    slug: 'botpress',
    displayName: 'Botpress',
    description: {
      short: 'Open-source tools and a hosted platform to build complex AI chatbot workflows.'
    },
    siteHostname: 'botpress.com',
    logo: {
      localPath: '/images/logos/botpress.png'
    },
    siteLinks: {
      homepage: 'https://botpress.com/'
    },
    socials: {
      discord: 'https://discord.gg/botpress',
      github: 'https://github.com/botpress',
      twitter: 'https://x.com/getbotpress',
      linkedin: 'https://www.linkedin.com/company/botpress',
      youtube: 'https://www.youtube.com/botpress'
    },
    founders: [
      {
        name: 'Sylvain Perron',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/slvnperron'
      },
      {
        name: 'Justin Watson',
        linkedinUrl: 'https://www.linkedin.com/in/justin-watson-6b232316/'
      }
    ],
    timelineNotes: {
      'July 29, 2021': `
        Botpress raises $15M in Series A funding led by Decibel Partners with participation from Inovia Capital and existing investors.
      `
    },
    githubRepositories: ['botpress/botpress'],
    tags: [ProjectCategory.Workflows, ProjectCategory.OpenSource],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Bland: {
    id: 'bland',
    slug: 'bland',
    displayName: 'Bland',
    tagline: 'Build, Test, & Scale AI Voice Agents.',
    description: {
      short: 'Infrastructure for building, testing, & scaling AI phone calling applications.'
    },
    siteHostname: 'bland.ai',
    logo: {
      localPath: '/images/logos/bland.png'
    },
    siteLinks: {
      homepage: 'https://www.bland.ai',
      documentation: 'https://docs.bland.ai',
      dashboard: 'https://app.bland.ai/dashboard?page=home',
      credentials: 'https://app.bland.ai/dashboard?page=settings'
    },
    tags: [ProjectCategory.RealtimeConversation, ProjectCategory.PhoneCalling],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // D
  Daily: {
    id: 'daily',
    slug: 'daily',
    displayName: 'Daily',
    tagline: 'Real-time video & audio APIs.',
    foundedOn: '2015',
    description: {
      short:
        'WebRTC native SDKs and infrastructure delivering the best possible video & audio quality on every network, for every device, everywhere in the world.'
    },
    siteHostname: 'daily.co',
    logo: {
      localPath: '/images/logos/daily.png'
    },
    siteLinks: {
      homepage: 'https://www.daily.co',
      documentation: 'https://docs.daily.co'
    },
    socials: {
      github: 'https://github.com/daily-co',
      twitter: 'https://x.com/trydaily',
      linkedin: 'https://www.linkedin.com/company/dailyco',
      youtube: 'https://www.youtube.com/@DailyHQ'
    },
    founders: [
      {
        name: 'Kwindla Kramer',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/kwkramer'
      },
      {
        name: 'Nina Kuruvilla',
        linkedinUrl: 'https://www.linkedin.com/in/nina-kuruvilla'
      },
      {
        name: 'Doug Brunton',
        linkedinUrl: 'https://www.linkedin.com/in/doug-brunton'
      }
    ],
    timelineNotes: {
      'Nov 10, 2021': `
        Daily raises $40M in Series B funding, led by Renegade Partners with participation from new investors Heritage Group, Cendana Capital and Sean Rose.
        
        Participation from existing investors included Lachy Groom, Tiger Global, Freestyle Ventures, Slack Fund, Root VC, Moxxie, Haystack Ventures, Todd & Rahul’s Angel Fund, David Eckstein and Aston Motes.
      `
    },
    githubRepositories: [
      'daily-co/daily-react',
      'daily-co/daily-js',
      'daily-co/daily-python',
      'daily-co/daily-client-ios',
      'daily-co/daily-client-android',
      'pipecat-ai/pipecat'
    ],
    tags: [ProjectCategory.PaaS, ProjectCategory.WebRTC],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // E
  ElevenLabs: {
    id: 'elevenlabs',
    slug: 'elevenlabs',
    displayName: 'ElevenLabs',
    description: {
      short: 'Industry-leading text-to-speech voice quality.'
    },
    siteHostname: 'elevenlabs.io',
    logo: {
      localPath: '/images/logos/elevenlabs.png'
    },
    siteLinks: {
      homepage: 'https://elevenlabs.io'
    },
    tags: [],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // F
  Fixie: {
    id: 'fixie',
    slug: 'fixie',
    displayName: 'Fixie AI',
    tagline: 'Real-time Artificial Intelligence',
    foundedOn: 'Sept 2022',
    description: {
      short:
        'Building state-of-the-art speech-to-speech models that capture the nuances of human conversation.',
      long: `
        Fixie is a research-driven company that is building real-time AI models for human communication.

        In addition to a focus on speech-to-speech models, Fixie is also conducting research into real-time avatars, & other forms of human-computer interaction.
      `
    },
    siteHostname: 'fixie.ai',
    logo: {
      localPath: '/images/logos/fixie.png'
    },
    siteLinks: {
      homepage: 'https://fixie.ai'
    },
    socials: {
      twitter: 'https://x.com/FixieAI',
      github: 'https://github.com/fixie-ai',
      linkedin: 'https://www.linkedin.com/company/fixie-ai'
    },
    founders: [
      {
        name: 'Zach Koch',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/zachkoch',
        twitterUrl: 'https://x.com/zachk'
      },
      {
        name: 'Justin Uberti',
        role: 'CTO',
        linkedinUrl: 'https://www.linkedin.com/in/juberti/',
        twitterUrl: 'https://x.com/juberti'
      }
    ],
    timelineNotes: {
      'May 30, 2023': `
        Fixie raises $17M in seed funding led by Redpoint Ventures.

        The round included participation from Madrona Venture Group, Zetta Venture Partners, SignalFire, Bloomberg Beta, and Kearny Jackson. Current and former execs at Google, Amazon, and Apple also invested.
      `
    },
    githubRepositories: ['fixie-ai/thefastest.ai', 'fixie-ai/ai-benchmarks'],
    specialUrls: ['https://thefastest.ai'],
    tags: [ProjectCategory.FoundationalModels, ProjectCategory.RealtimeConversation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Flyflow: {
    id: 'flyflow',
    slug: 'flyflow',
    displayName: 'Flyflow',
    tagline: 'API Infrastructure for AI Voice Agents.',
    description: {
      short: 'A developer platform for building human-like AI voice assistants.'
    },
    siteHostname: 'flyflow.ai',
    logo: {
      localPath: '/images/logos/flyflow.png'
    },
    siteLinks: {
      homepage: 'https://flyflow.dev',
      documentation: 'https://docs.flyflow.dev/docs',
      dashboard: 'https://app.flyflow.dev'
    },
    socials: {
      github: 'https://github.com/flyflow-devs',
      twitter: 'https://x.com/flyflowapi',
      linkedin: 'https://www.linkedin.com/company/flyflowdev'
    },
    timelineNotes: {
      'May 15, 2024': `
        Flyflow launches its public API & SDKs for AI voice agents.
      `
    },
    tags: [ProjectCategory.RealtimeConversation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  FreedomGPT: {
    id: 'freedomgpt',
    slug: 'freedomgpt',
    displayName: 'FreedomGPT',
    description: {
      short: 'Fast, private, uncensored AI chat that even works offline.'
    },
    siteHostname: 'freedomgpt.com',
    logo: {
      localPath: '/images/logos/freedomgpt.png'
    },
    siteLinks: {
      homepage: 'https://www.freedomgpt.com/'
    },
    tags: [],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // H
  Hume: {
    id: 'hume',
    slug: 'hume',
    displayName: 'Hume',
    tagline: 'Empathic AI to serve human well-being.',
    foundedOn: 'Mar 2021',
    description: {
      short:
        'Foundational models for human understanding, offering real-time AI conversation & APIs for detecting human emotion.'
    },
    siteHostname: 'hume.ai',
    logo: {
      localPath: '/images/logos/hume.png'
    },
    siteLinks: {
      homepage: 'https://www.hume.ai',
      documentation: 'https://dev.hume.ai',
      dashboard: 'https://beta.hume.ai',
      playground: 'https://beta.hume.ai/playground/voice',
      credentials: 'https://beta.hume.ai/settings/keys'
    },
    socials: {
      discord: 'https://discord.com/invite/WPRSugvAm6',
      github: 'https://github.com/HumeAI',
      twitter: 'https://twitter.com/hume_ai'
    },
    founders: [
      {
        name: 'Alan Cowen',
        role: 'CEO & Chief Scientist',
        linkedinUrl: 'https://www.linkedin.com/in/alan-cowen',
        twitterUrl: 'https://x.com/AlanCowen',
        preferTwitterUrl: true
      }
    ],
    tags: [ProjectCategory.RealtimeConversation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // L
  Livekit: {
    id: 'livekit',
    foundedOn: 'Mar 2021',
    slug: 'livekit',
    displayName: 'LiveKit',
    description: {
      short:
        'Realtime platform that enables developers to build video, voice, and data capabilities into their applications.'
    },
    siteHostname: 'livekit.io',
    logo: {
      localPath: '/images/logos/livekit.png'
    },
    siteLinks: {
      homepage: 'https://livekit.io',
      documentation: 'https://docs.livekit.io',
      playground: 'https://kitt.livekit.io'
    },
    socials: {
      github: 'https://github.com/livekit',
      twitter: 'https://x.com/livekit',
      linkedin: 'https://www.linkedin.com/company/livekitco'
    },
    founders: [
      {
        name: "Russ d'Sa",
        linkedinUrl: 'https://www.linkedin.com/in/russelldsa',
        twitterUrl: 'https://x.com/dsa',
        preferTwitterUrl: true
      },
      {
        name: 'David Zhao',
        linkedinUrl: 'https://www.linkedin.com/in/davidzhao',
        twitterUrl: 'https://x.com/davidzh'
      }
    ],
    githubRepositories: [
      'livekit/livekit',
      'livekit/agents',
      'livekit/egress',
      'livekit/ingress',
      'livekit/sip'
    ],
    tags: [ProjectCategory.PaaS, ProjectCategory.WebRTC],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  LMNT: {
    id: 'lmnt',
    slug: 'lmnt',
    displayName: 'LMNT',
    description: {
      short: 'Fast, life-like, reliable text-to-speech.'
    },
    siteHostname: 'lmnt.com',
    logo: {
      localPath: '/images/logos/lmnt.png'
    },
    siteLinks: {
      homepage: 'https://www.lmnt.com',
      documentation: 'https://docs.lmnt.com'
    },
    tags: [ProjectCategory.TextToSpeech],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // N
  Neets: {
    id: 'neets',
    slug: 'neets',
    displayName: 'Neets AI',
    description: {
      short: 'Quality text-to-speech at industry-leading prices.'
    },
    siteHostname: 'neets.ai',
    logo: {
      localPath: '/images/logos/neets-ai.png'
    },
    siteLinks: {
      homepage: 'https://neets.ai'
    },
    tags: [ProjectCategory.TextToSpeech],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // O
  Observe: {
    id: 'observe',
    slug: 'observe',
    displayName: 'Observe AI',
    description: {
      short: 'Building conversational intelligence for contact centers.'
    },
    siteHostname: 'observe.ai',
    logo: {
      localPath: '/images/logos/observe-ai.png'
    },
    siteLinks: {
      homepage: 'https://www.observe.ai'
    },
    socials: {
      github: 'https://github.com/Observeai-Research',
      twitter: 'https://x.com/observeAI',
      linkedin: 'https://www.linkedin.com/company/observeai',
      youtube: 'https://www.youtube.com/channel/UCAgWQTk2mkM7H-Rug5f0RVg'
    },
    founders: [
      {
        name: 'Swapnil Jain',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/conversationintelligence',
        twitterUrl: 'https://x.com/swapnil'
      },
      {
        name: 'Jithendra Vepa',
        role: 'CTO',
        linkedinUrl: 'https://www.linkedin.com/in/jithendra-vepa-2402751'
      }
    ],
    timelineNotes: {
      'April 12, 2022': `
        Observe.AI raises $125M in a Series C led by SoftBank Vision Fund 2 with participation from Zoom Video Communications, Inc.

        This brings Observe.AI's total funding to $213M.
      `
    },
    tags: [ProjectCategory.ContactCenter],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  OpenAI: {
    id: 'openai',
    slug: 'openai',
    displayName: 'OpenAI',
    foundedOn: 'Dec 2015',
    description: {
      short:
        'OpenAI is an AI research organization focused on building safe AGI that benefits all of humanity.'
    },
    siteHostname: 'openai.com',
    logo: {
      localPath: '/images/logos/openai.png'
    },
    siteLinks: {
      homepage: 'https://openai.com',
      documentation: 'https://platform.openai.com/docs',
      dashboard: 'https://platform.openai.com',
      playground: 'https://platform.openai.com/playground',
      credentials: 'https://platform.openai.com/api-keys'
    },
    socials: {
      discord: 'https://discord.com/invite/openai',
      github: 'https://github.com/openai',
      twitter: 'https://twitter.com/openai',
      linkedin: 'https://www.linkedin.com/company/openai',
      youtube: 'https://www.youtube.com/openai'
    },
    founders: [
      {
        name: 'Ilya Sutskever',
        linkedinUrl: 'https://www.linkedin.com/in/ilya-sutskever',
        twitterUrl: 'https://x.com/ilyasut',
        preferTwitterUrl: true
      },
      { name: 'Greg Brockman', linkedinUrl: 'https://www.linkedin.com/in/thegdb' },
      { name: 'Trevor Blackwell', linkedinUrl: 'https://www.linkedin.com/in/trblackwell' },
      { name: 'Vicki Cheung', linkedinUrl: 'https://www.linkedin.com/in/vickicheung' },
      { name: 'Andrej Karpathy', twitterUrl: 'https://x.com/karpathy' },
      { name: 'Durk Kingma', twitterUrl: 'https://x.com/dpkingma' },
      { name: 'Jessica Livingston', twitterUrl: 'https://x.com/jesslivingston' },
      { name: 'John Schulman', twitterUrl: 'https://x.com/johnschulman2' },
      { name: 'Wojciech Zaremba', twitterUrl: 'https://x.com/woj_zaremba' }
    ],
    timelineNotes: {
      'May 13, 2024': `
        OpenAI launches GPT-4o, a multi-modal model that can go voice-to-voice in 1 request, a large technical leap over current 3-step voice pipelines.
      `,
      'March 14, 2023': `
        GPT-4 launches.
      `,
      'Nov 30, 2022': `
        ChatGPT, a conversational model that can generate human-like responses, launches.
      `
    },
    githubRepositories: [
      'openai/openai-cookbook',
      'openai/whisper',
      'openai/evals',
      'openai/gpt-2',
      'openai/tiktoken'
    ],
    tags: [ProjectCategory.FoundationalModels],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  OpenRouter: {
    id: 'openrouter',
    slug: 'openrouter',
    displayName: 'OpenRouter',
    tagline: 'A unified interface for LLMs.',
    foundedOn: '2023',
    description: {
      short: 'A unified interface for LLMs. Find the best models & prices for your prompts.'
    },
    siteHostname: 'openrouter.ai',
    logo: {
      localPath: '/images/logos/openrouter.png'
    },
    siteLinks: {
      homepage: 'https://openrouter.ai',
      documentation: 'https://openrouter.ai/docs',
      playground: 'https://openrouter.ai/playground'
    },
    socials: {
      discord: 'https://discord.gg/fVyRaUDgxW',
      twitter: 'https://x.com/OpenRouterAI'
    },
    tags: [ProjectCategory.FoundationalModels],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  OpenVoiceOS: {
    id: 'openvoiceos',
    slug: 'openvoiceos',
    displayName: 'OpenVoiceOS',
    description: {
      short:
        'OpenVoiceOS is a community-driven, open-source voice AI platform for creating custom voice-controlled interfaces across devices with NLP, a customizable UI, and a focus on privacy and security.'
    },
    siteHostname: 'openvoiceos.org',
    logo: {
      localPath: '/images/logos/openvoiceos.png'
    },
    siteLinks: {
      homepage: 'https://openvoiceos.org',
      documentation: 'https://openvoiceos.github.io/community-docs'
    },
    socials: {
      twitter: 'https://twitter.com/openvoiceos',
      github: 'https://github.com/OpenVoiceOS'
    },
    tags: [ProjectCategory.OpenSource],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  OVEngine: {
    id: 'ov-engine',
    slug: 'ovengine',
    displayName: 'ovEngine',
    tagline: 'Building LLMs that speak like humans.',
    foundedOn: 'early 2024',
    description: {
      short:
        'Highly conversational AI with your data predictably, security, & a 90%+ cost reduction per token.'
    },
    siteHostname: 'ovengine.com',
    logo: {
      localPath: '/images/logos/ov-engine.png'
    },
    siteLinks: {
      homepage: 'https://www.ovengine.com'
    },
    socials: {
      discord: 'https://discord.com/invite/5NdUYAyzn7'
    },
    founders: [
      {
        name: 'Mason Adams',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/masonadamstx'
      }
    ],
    tags: [ProjectCategory.RealtimeConversation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // P
  Pam: {
    id: 'pam-auto',
    slug: 'pam-auto',
    displayName: 'Pam Auto',
    tagline: 'Book more services. Sell more cars.',
    description: {
      short: 'AI voice receptionists for the automotive industry.'
    },
    siteHostname: 'pamhq.com',
    logo: {
      localPath: '/images/logos/pam-auto.png'
    },
    siteLinks: {
      homepage: 'https://www.pamhq.com/'
    },
    socials: {
      linkedin: 'https://www.linkedin.com/company/pam-ai'
    },
    tags: [ProjectCategory.Receptionists],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Phonelo: {
    id: 'phonelo',
    slug: 'phonelo',
    displayName: 'Phonelo',
    tagline: 'AI phone calls for every industry.',
    description: {
      short: 'Phonelo builds solutions for AI phone calling.'
    },
    siteHostname: 'phonelo.ai',
    logo: {
      localPath: '/images/logos/phonelo.png'
    },
    siteLinks: {
      homepage: 'https://phonelo.com'
    },
    socials: {
      twitter: 'https://x.com/hellophonelo',
      linkedin: 'https://www.linkedin.com/company/phonelo'
    },
    tags: [ProjectCategory.PhoneCalling],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  PlayAI: {
    id: 'playai',
    slug: 'playai',
    displayName: 'PlayAI',
    tagline: 'The Voice Interface of AI.',
    description: {
      short:
        'Build AI voice agents that can schedule appointments, perform customer support, conduct outbound sales, & more.'
    },
    siteHostname: 'play.ai',
    logo: {
      localPath: '/images/logos/playai.png'
    },
    siteLinks: {
      homepage: 'https://play.ai',
      documentation: 'https://docs.play.ai',
      dashboard: 'https://play.ai/my-agents',
      credentials: 'https://play.ai/developers'
    },
    socials: {
      twitter: 'https://twitter.com/play_ht',
      discord: 'https://discord.gg/gTzFUdnABC'
    },
    timelineNotes: {
      'April 22, 2024': `
        PlayHT launches PlayAI, a platform to build AI voice agents.
      `
    },
    tags: [ProjectCategory.RealtimeConversation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Plumb: {
    id: 'plumb',
    slug: 'plumb',
    displayName: 'Plumb',
    foundedOn: 'Aug 2020',
    description: {
      short: 'Rapidly build & deploy complex AI pipelines.'
    },
    siteHostname: 'useplumb.com',
    logo: {
      localPath: '/images/logos/plumb.png'
    },
    siteLinks: {
      homepage: 'https://useplumb.com'
    },
    socials: {
      twitter: 'https://x.com/useplumb',
      linkedin: 'https://www.linkedin.com/company/useplumb'
    },
    founders: [
      {
        name: 'Aaron Dignan',
        linkedinUrl: 'https://www.linkedin.com/in/aarondignan',
        twitterUrl: 'https://x.com/aarondignan'
      },
      {
        name: 'Chase Adams',
        linkedinUrl: 'https://www.linkedin.com/in/curiouslychase',
        twitterUrl: 'https://x.com/curiouslychase'
      }
    ],
    tags: [ProjectCategory.Workflows],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // R
  Recall: {
    id: 'recall',
    slug: 'recall',
    displayName: 'Recall',
    tagline: 'Universal API for meeting bots.',
    foundedOn: 'Feb 2022',
    description: {
      short:
        'A single API for meeting bots on every platform like Zoom, Google Meet, Microsoft Teams and more.'
    },
    siteHostname: 'recall.ai',
    logo: {
      localPath: '/images/logos/recall.png'
    },
    siteLinks: {
      homepage: 'https://www.recall.ai',
      documentation: 'https://docs.recall.ai'
    },
    socials: {
      linkedin: 'https://www.linkedin.com/company/recall-ai/',
      twitter: 'https://x.com/recall_ai'
    },
    founders: [
      {
        name: 'David Gu',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/david-gu/'
      },
      {
        name: 'Amanda Zhu',
        linkedinUrl: 'https://www.linkedin.com/in/zhu-amanda/'
      }
    ],
    timelineNotes: {
      'May 16, 2024': `
        Recall.ai raises $10M to give any developer the ability to build AI meeting bots in days.
      `
    },
    tags: [ProjectCategory.Meetings],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Retell: {
    id: 'retell',
    slug: 'retell',
    displayName: 'Retell',
    tagline: 'AI voice agents that interact like humans.',
    foundedOn: 'late 2023',
    description: {
      short:
        'A platform for developers to build, test, & deploy production-ready AI voice agents at scale.'
    },
    siteHostname: 'retellai.com',
    logo: {
      localPath: '/images/logos/retell.png'
    },
    siteLinks: {
      homepage: 'https://www.retellai.com',
      documentation: 'https://docs.retellai.com',
      dashboard: 'https://beta.retellai.com/dashboard',
      credentials: 'https://beta.retellai.com/dashboard/apiKeys'
    },
    socials: {
      discord: 'https://discord.com/invite/wxtjkjj2zp',
      github: 'https://github.com/RetellAI',
      twitter: 'https://twitter.com/retellai'
    },
    founders: [
      {
        name: 'Bing Wu',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/binwu'
      },
      {
        name: 'Todd Li',
        linkedinUrl: 'https://linkedin.com/in/zhengtaoli'
      },
      {
        name: 'Evie Wang',
        role: 'CMO',
        linkedinUrl: 'https://www.linkedin.com/in/yanwang131415'
      },
      {
        name: 'Weijia Yu',
        linkedinUrl: 'https://www.linkedin.com/in/weijia-y-76b816194'
      },
      {
        name: 'Zexia Zhang',
        role: 'CTO',
        linkedinUrl: 'https://www.linkedin.com/in/zexia-zhang-171480133'
      }
    ],
    tags: [ProjectCategory.RealtimeConversation, ProjectCategory.PhoneCalling],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Rime: {
    id: 'rime',
    slug: 'rime',
    displayName: 'Rime',
    description: {
      short: 'Fast, life-like text-to-speech.'
    },
    siteHostname: 'rime.ai',
    logo: {
      localPath: '/images/logos/rime-ai.png'
    },
    siteLinks: {
      homepage: 'https://rime.ai'
    },
    tags: [ProjectCategory.TextToSpeech],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // S
  Setter: {
    id: 'setter',
    slug: 'setter',
    displayName: 'Setter',
    description: {
      short: 'AI phone callers for sales & appointment setting.'
    },
    siteHostname: 'trysetter.com',
    logo: {
      localPath: '/images/logos/setter.png'
    },
    siteLinks: {
      homepage: 'https://www.trysetter.com'
    },
    socials: {
      twitter: 'https://twitter.com/TrySetter',
      linkedin: 'https://www.linkedin.com/company/setterai'
    },
    tags: [ProjectCategory.Sales],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  SFVoiceCompany: {
    id: 'the-voice-company-of-san-francisco',
    slug: 'sf-voice-company',
    displayName: 'The Voice Company of San Francisco',
    foundedOn: 'early 2024',
    description: {
      short: 'Building software & tools for voice AI developers.'
    },
    siteHostname: 'sfvoice.company',
    logo: {
      localPath: '/images/logos/sf-voice-company.png'
    },
    siteLinks: {
      homepage: 'https://sfvoice.company'
    },
    socials: {
      discord: 'https://discord.gg/RPReWmsxyT',
      github: 'https://github.com/thevoicecompany',
      twitter: 'https://x.com/voicecompanySF'
    },
    timelineNotes: {
      'May 2024': `
        Launches bench.audio, a battleground for voice assistants using an Elo rating system to rank competing configurations.
      `
    },
    githubRepositories: ['thevoicecompany/bench.audio'],
    specialUrls: ['https://bench.audio'],
    tags: [ProjectCategory.RealtimeConversation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  SignalWire: {
    id: 'signalwire',
    slug: 'signalwire',
    displayName: 'SignalWire',
    description: {
      short: 'Programmable communication APIs for telecom, video, voice, & more.'
    },
    siteHostname: 'signalwire.com',
    logo: {
      localPath: '/images/logos/signalwire.png'
    },
    siteLinks: {
      homepage: 'https://signalwire.com'
    },
    socials: {
      github: 'https://github.com/signalwire',
      twitter: 'https://twitter.com/signalwire',
      linkedin: 'https://www.linkedin.com/company/signalwire',
      youtube: 'https://www.youtube.com/channel/UCerXdtujij53AL9IOBFj4SA'
    },
    founders: [
      {
        name: 'Anthony Minessale',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/anthonyminessale',
        twitterUrl: 'https://x.com/anthmfs'
      },
      {
        name: 'Evan McGee',
        role: 'CTO',
        linkedinUrl: 'https://www.linkedin.com/in/mrmcgee',
        twitterUrl: 'https://x.com/startledmarmot'
      }
    ],
    timelineNotes: {
      'June 2, 2021': `
        SignalWire raises $30M in Series B funding led by Prosperity7 Ventures, and joined by Storm Ventures, Samsung NEXT, Jerry Yang (AME Cloud Ventures), and Dean Drako (Barracuda Networks).
      `
    },
    githubRepositories: [
      'signalwire/freeswitch',
      'signalwire/signalwire-node',
      'signalwire/signalwire-js'
    ],
    tags: [ProjectCategory.Telecom, ProjectCategory.API],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Sindarin: {
    id: 'sindarin',
    slug: 'sindarin',
    displayName: 'Sindarin',
    description: {
      short: 'Real-time AI conversation for developers.'
    },
    siteHostname: 'sindarin.tech',
    logo: {
      localPath: '/images/logos/sindarin.png'
    },
    siteLinks: {
      homepage: 'https://www.sindarin.tech',
      documentation:
        'https://wirehaired-caravan-e73.notion.site/Sindarin-Persona-Documentation-BETA-130182f2903742f5874cb44aaceaccb7',
      dashboard: 'https://persona-webapp-beta.vercel.app',
      playground: 'https://persona-webapp-beta.vercel.app/#',
      credentials: 'https://persona-webapp-beta.vercel.app/#'
    },
    socials: {
      twitter: 'https://x.com/SindarinTech'
    },
    founders: [
      {
        name: 'Brian Atwood',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/batwood011',
        twitterUrl: 'https://x.com/batwood011'
      }
    ],
    tags: [ProjectCategory.RealtimeConversation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // T
  Talkscriber: {
    id: 'talkscriber',
    slug: 'talkscriber',
    displayName: 'Talkscriber',
    description: {
      short: 'Enterprise-grade real-time transcription.'
    },
    siteHostname: 'talkscriber.com',
    logo: {
      localPath: '/images/logos/talkscriber.png'
    },
    siteLinks: {
      homepage: 'https://www.talkscriber.com'
    },
    tags: [ProjectCategory.SpeechToText],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Tincans: {
    id: 'tincans',
    slug: 'tincans',
    displayName: 'Tincans',
    tagline: 'Real-time conversation speech.',
    foundedOn: 'early 2024',
    description: {
      short: 'Real-time conversational speech with large language models.',
      long: `
        Tincans is building audio-input models for real-time AI conversation.
      `
    },
    siteHostname: 'tincans.ai',
    logo: {
      localPath: '/images/logos/tincans.png'
    },
    siteLinks: {
      homepage: 'https://tincans.ai'
    },
    socials: {
      github: 'https://github.com/tincans-ai'
    },
    founders: [
      {
        name: 'Chris Hua',
        linkedinUrl: 'https://www.linkedin.com/in/chris-hua',
        twitterUrl: 'https://x.com/hingeloss',
        preferTwitterUrl: true
      }
    ],
    timelineNotes: {
      'April 17, 2024': `
        A demo showcasing conversational replies with <500ms latency (locally) is released.
      `,
      'March 3, 2024': `
        Gazelle v0.1 is released, a joint-speech large language model that can take audio directly as input.
      `
    },
    githubRepositories: ['tincans-ai/gazelle'],
    tags: [ProjectCategory.FoundationalModels, ProjectCategory.RealtimeConversation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Toby: {
    id: 'toby',
    slug: 'toby',
    displayName: 'Toby',
    tagline: 'Two-way real-time translation.',
    description: {
      short: 'Real-time translation for conversations.'
    },
    siteHostname: 'trytoby.com',
    logo: {
      localPath: '/images/logos/toby.png'
    },
    siteLinks: {
      homepage: 'https://www.trytoby.com'
    },
    socials: {
      linkedin: 'https://www.linkedin.com/company/toby-ai'
    },
    tags: [ProjectCategory.Translation],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Together: {
    id: 'together',
    slug: 'together',
    displayName: 'Together AI',
    description: {
      short: 'Fast and scalable cloud inference, fine-tuning, custom model training, & more.'
    },
    siteHostname: 'together.ai',
    logo: {
      localPath: '/images/logos/together-ai.png'
    },
    siteLinks: {
      homepage: 'https://www.together.ai'
    },
    tags: [ProjectCategory.Infrastructure],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // V
  Vapi: {
    id: 'vapi',
    slug: 'vapi',
    displayName: 'Vapi',
    tagline: 'Voice AI for developers.',
    foundedOn: 'mid-2023',
    description: {
      short: 'Developer platform for building real-time AI conversation.',
      long: `
          Vapi provides developers a fully modular platform to build AI voice pipelines. Developers can swap between various transcription, model, & voice providers without writing any additional code.

          Vapi runs custom ML models between each leg of the voice pipeline, attempting to simlate the natural flow of human conversation.

          Vapi also offers real-time SDKs for a variety of languages, covering every major platform (Web, Mobile, server-side, etc.)
      `
    },
    siteHostname: 'vapi.ai',
    logo: {
      localPath: '/images/logos/vapi.png'
    },
    siteLinks: {
      homepage: 'https://vapi.ai',
      documentation: 'https://docs.vapi.ai',
      dashboard: 'https://dashboard.vapi.ai',
      credentials: 'https://dashboard.vapi.ai/org/settings'
    },
    socials: {
      discord: 'https://discord.gg/pUFNcf2WmH',
      github: 'https://github.com/VapiAI',
      twitter: 'https://x.com/Vapi_AI'
    },
    founders: [
      {
        name: 'Jordan Dearsley',
        role: 'CEO',
        linkedinUrl: 'https://www.linkedin.com/in/jordandearsley',
        twitterUrl: 'https://x.com/jordan_dearsley'
      },
      {
        name: 'Nikhil Gupta',
        role: 'CTO',
        linkedinUrl: 'https://www.linkedin.com/in/nikhilro',
        twitterUrl: 'https://x.com/nikhilro_'
      }
    ],
    timelineNotes: {
      'March 2024': `
      Launched on Product Hunt. Developers could hot-swap between a range of transcription, model, & text-to-speech providers.
      
      Vapi offered the most natural conversational flow, lowest latency, & highest modularity of any other platform at the time.
      `
    },
    githubRepositories: [
      'VapiAI/web',
      'VapiAI/python',
      'VapiAI/ios',
      'VapiAI/flutter',
      'VapiAI/react-native',
      'VapiAI/docs'
    ],
    tags: [ProjectCategory.RealtimeConversation, ProjectCategory.PhoneCalling],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,
  Vocode: {
    id: 'vocode',
    slug: 'vocode',
    displayName: 'Vocode',
    tagline: 'Open source Voice AI.',
    description: {
      short: 'Build, deploy, & scale hyperrealistic voice agents.'
    },
    siteHostname: 'vocode.dev',
    logo: {
      localPath: '/images/logos/vocode.png'
    },
    siteLinks: {
      homepage: 'https://www.vocode.dev',
      documentation: 'https://docs.vocode.dev',
      dashboard: 'https://dashboard.vocode.dev',
      credentials: 'https://dashboard.vocode.dev/developers/api-keys'
    },
    socials: {
      twitter: 'https://twitter.com/vocodehq',
      github: 'https://github.com/vocodedev',
      discord: 'https://discord.com/invite/NaU4mMgcnC'
    },
    githubRepositories: ['vocodedev/vocode-python'],
    tags: [ProjectCategory.RealtimeConversation, ProjectCategory.PhoneCalling],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData,

  // W
  Wellsaid: {
    id: 'wellsaid',
    slug: 'wellsaid',
    displayName: 'Wellsaid',
    description: {
      short: 'Generate high-quality, configurable, AI voice-overs for your brand.'
    },
    siteHostname: 'wellsaidlabs.com',
    logo: {
      localPath: '/images/logos/wellsaid.png'
    },
    siteLinks: {
      homepage: 'https://wellsaidlabs.com'
    },
    tags: [ProjectCategory.TextToSpeech],
    lastUpdatedAt: 'May 27, 2024'
  } as IProjectData
};

export const getProjectById = (id: string): IProjectData | Empty => {
  return Object.values(Projects).find((project) => project.id === id);
};
export const getProjectBySlug = (slug: string): IProjectData | Empty => {
  return Object.values(Projects).find((project) => project.slug === slug);
};
export const getFirstProject = (): IProjectData => {
  return Object.values(Projects)[0];
};

export const ProjectRepoStats = {
  TotalProjects: Object.keys(Projects).length,
  TotalRepositories: Object.values(Projects).reduce((acc, project) => {
    return acc + (project?.githubRepositories?.length || 0);
  }, 0),
  TotalLinks: Object.values(Projects).reduce((acc, project) => {
    return acc + (project?.specialUrls?.length || 0);
  }, 0)
};
