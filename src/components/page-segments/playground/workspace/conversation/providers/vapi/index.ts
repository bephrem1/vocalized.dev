export enum VapiModelId {
  // Proprietary
  // - OpenAI
  OpenAIGPT3_5Turbo = 'gpt-3.5-turbo',
  OpenAIGPT4Turbo = 'gpt-4-turbo',

  // Open Source
  // - Meta
  Llama8b_8192Groq = 'llama-8b-8192-groq',
  Llama70b_8192Groq = 'llama-70b-8192-groq'
}

export const getVapiModelConfig = ({
  modelId,
  systemPrompt
}: {
  modelId: VapiModelId;
  systemPrompt: string;
}) => {
  let baseOptions = getVapiModelBaseOptions(modelId);

  return {
    ...baseOptions,
    messages: [
      {
        role: 'system',
        content: systemPrompt
      }
    ]
  };
};
const getVapiModelBaseOptions = (modelId: VapiModelId) => {
  switch (modelId) {
    case VapiModelId.OpenAIGPT3_5Turbo:
      return {
        provider: 'openai',
        model: 'gpt-3.5-turbo'
      };
    case VapiModelId.OpenAIGPT4Turbo:
      return {
        provider: 'openai',
        model: 'gpt-4-turbo'
      };
    case VapiModelId.Llama8b_8192Groq:
      return {
        provider: 'groq',
        model: 'llama3-8b-8192'
      };
    case VapiModelId.Llama70b_8192Groq:
      return {
        provider: 'groq',
        model: 'llama3-70b-8192'
      };
  }
};

export enum VapiVoiceId {
  PlayHTJennifer = 'playht-jennifer',
  PlayHTJack = 'playht-jack'
}

export const getVapiVoiceConfig = ({ voiceId }: { voiceId: VapiVoiceId }) => {
  switch (voiceId) {
    case VapiVoiceId.PlayHTJennifer:
      return {
        provider: 'playht',
        voiceId: 'jennifer'
      };
    case VapiVoiceId.PlayHTJack:
      return {
        provider: 'playht',
        voiceId: 'jack'
      };
  }
};
