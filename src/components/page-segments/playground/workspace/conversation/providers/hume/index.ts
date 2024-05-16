export enum HumeModelProviderId {
  OpenAI = 'OPEN_AI',
  ANTHROPIC = 'ANTHROPIC',
  GROQ = 'GROQ'
}

export enum HumeModelId {
  Default = '_default',

  // OpenAI
  Gpt3_5Turbo = 'gpt-3.5-turbo',
  Gpt4TurboPreview = 'gpt-4-turbo-preview',
  Gpt4o = 'gpt-4o',

  // Anthropic
  Claude3Opus = 'claude-3-opus-20240229',
  Claude3Sonnet = 'claude-3-sonnet-20240229',
  Claude3Haiku = 'claude-3-haiku-20240307',

  // Groq (w/ Meta, Google, etc)
  Llama8b_8192Groq = 'llama3-8b-8192',
  Llama70b_8192Groq = 'llama-70b-8192',
  Gemma7bItGroq = 'gemma-7b-it'
}

export const getHumeLanguageModelConfig = ({ modelId }) => {
  if (modelId === HumeModelId.Default) {
    return null;
  }

  switch (modelId) {
    case HumeModelId.Gpt3_5Turbo:
      return {
        model_provider: HumeModelProviderId.OpenAI,
        model_resource: HumeModelId.Gpt3_5Turbo
      };
    case HumeModelId.Gpt4TurboPreview:
      return {
        model_provider: HumeModelProviderId.OpenAI,
        model_resource: HumeModelId.Gpt4TurboPreview
      };
    case HumeModelId.Gpt4o:
      return {
        model_provider: HumeModelProviderId.OpenAI,
        model_resource: HumeModelId.Gpt4o
      };
    case HumeModelId.Claude3Opus:
      return {
        model_provider: HumeModelProviderId.ANTHROPIC,
        model_resource: HumeModelId.Claude3Opus
      };
    case HumeModelId.Claude3Sonnet:
      return {
        model_provider: HumeModelProviderId.ANTHROPIC,
        model_resource: HumeModelId.Claude3Sonnet
      };
    case HumeModelId.Claude3Haiku:
      return {
        model_provider: HumeModelProviderId.ANTHROPIC,
        model_resource: HumeModelId.Claude3Haiku
      };
    case HumeModelId.Llama8b_8192Groq:
      return {
        model_provider: HumeModelProviderId.GROQ,
        model_resource: HumeModelId.Llama8b_8192Groq
      };
    case HumeModelId.Llama70b_8192Groq:
      return {
        model_provider: HumeModelProviderId.GROQ,
        model_resource: HumeModelId.Llama70b_8192Groq
      };
    case HumeModelId.Gemma7bItGroq:
      return {
        model_provider: HumeModelProviderId.GROQ,
        model_resource: HumeModelId.Gemma7bItGroq
      };
  }
};
