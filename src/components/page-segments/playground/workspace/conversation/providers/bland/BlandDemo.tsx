import { BlandModelId, BlandVoiceId } from '.';
import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../../components';
import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { BlandWebClient } from 'bland-client-js-sdk';
import { CallState } from '../../../../../../../types/call';
import { ConvoDemoControlButton } from '../../components/ConvoDemoControlButton';
import { CredentialsContext } from '../../../../../../../context/credentials';
import { ModalContext } from '../../../../../../../context/modal';
import { ModalId } from '../../../../../../shared/modal/modal-id';
import { PlaygroundContext } from '../../../../../../../context/playground';
import { Providers } from '../../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../../shared/voice/orb/VoiceOrb';
import axios from 'axios';
import clsx from 'clsx';
import { isEmpty } from '../../../../../../../helpers/empty';
import tinycolor from 'tinycolor2';
import { useConvoDemoDisabled } from '../../../hooks/useConvoDemoDisabled';

interface BlandDemoProps {}

const blandBrandColor = '#6C66E7';

const BlandDemo: FunctionComponent<BlandDemoProps> = () => {
  const [blandClient, setBlandClient] = useState<BlandWebClient>(null);

  const [modelId, setModelId] = useState(BlandModelId.Turbo);
  const [voiceId, setVoiceId] = useState(BlandVoiceId.Tina);

  const [callState, setCallState] = useState<CallState>(CallState.Off);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);

  useBland({ blandClient });

  const onClick = useOnClick({
    modelId,
    voiceId,
    callState,
    setCallState,
    blandClient,
    setBlandClient
  });

  const disabled = useConvoDemoDisabled({ providerId: Providers.Bland.id });
  const orbColor = tinycolor(blandBrandColor).setAlpha(0.2).lighten(15).toRgbString();

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb
          color={orbColor}
          sizePx={175}
          callState={CallState.Off}
          onClick={onClick}
          disabled={disabled}
        />
        <ConvoDemoControlButton callState={callState} disabled={disabled} onClick={onClick} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLogoSymbol src={Providers.Bland.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.Bland.links.documentation} label="docs" />
      </div>
    </div>
  );
};

const useBland = ({ blandClient }: { blandClient: BlandWebClient }) => {
  useEffect(() => {
    if (blandClient) {
      console.log(blandClient.eventNames());
    }
  }, [blandClient]);
};

const useOnClick = ({ modelId, voiceId, callState, setCallState, blandClient, setBlandClient }) => {
  const { getCredentials, checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Providers.Bland.id });

  const { openModal } = useContext(ModalContext);
  if (callState === CallState.Off && !credentialsSet) {
    return () => {
      openModal({ modalId: ModalId.SetBlandCredentials });
    };
  }

  const { systemPrompt, firstMessage, setActiveConvoProviderId } = useContext(PlaygroundContext);
  const startCall = async () => {
    const credentials = getCredentials({ providerId: Providers.Bland.id });
    const apiKeySet = !isEmpty(credentials) && credentials.apiKey;

    if (apiKeySet) {
      setCallState(CallState.Connecting);
      setActiveConvoProviderId(Providers.Bland.id);

      try {
        const { agentId, callToken } = await setupCall({
          systemPrompt,
          firstMessage,
          modelId,
          voiceId,
          apiKey: credentials.apiKey
        });

        const callClient = new BlandWebClient(agentId, callToken);
        setBlandClient(callClient);

        callClient.initConversation({ sampleRate: 44100 } as any).then(() => {
          setCallState(CallState.Connected);
        });
      } catch (error) {
        console.error('Error starting Bland web call', error);

        setCallState(CallState.Off);
        setActiveConvoProviderId(null);
        setBlandClient(null);
      }
    }
  };
  const stopCall = () => {
    if (blandClient) {
      blandClient.stopConversation();

      setCallState(CallState.Off);
      setActiveConvoProviderId(null);
      setBlandClient(null);
    }
  };

  switch (callState) {
    case 'off':
      return startCall;
    case 'connecting':
      return null;
    case 'connected':
      return stopCall;
  }
};

const setupCall = async ({ systemPrompt, firstMessage, modelId, voiceId, apiKey }) => {
  const { agentId } = await createWebAgent({
    systemPrompt,
    firstMessage,
    modelId,
    voiceId,
    apiKey
  });
  const { callToken } = await authroizeWebCall({ agentId, apiKey });

  return { agentId, callToken };
};

const createWebAgent = async ({ systemPrompt, firstMessage, modelId, voiceId, apiKey }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: createWebAgentUrl(),
      headers: {
        Authorization: apiKey
      },
      data: {
        prompt: systemPrompt,
        model: modelId,
        voice: voiceId,
        first_sentence: firstMessage,
        language: 'ENG'
      }
    });

    const { agent } = response.data;
    const { agent_id } = agent;

    return { agentId: agent_id };
  } catch (error) {
    console.error('Error creating Bland web agent', error);
  }

  return { agentId: null };
};
const authroizeWebCall = async ({ agentId, apiKey }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: authorizeWebCallUrl({ agentId }),
      headers: {
        Authorization: apiKey
      }
    });

    const { token } = response.data;

    return { callToken: token };
  } catch (error) {
    console.error('Error authorizing Bland web call', error);
  }

  return { callToken: null };
};

const BLAND_API_BASE_URL = 'https://api.bland.ai';
const createWebAgentUrl = () => `${BLAND_API_BASE_URL}/v1/agents`;
const authorizeWebCallUrl = ({ agentId }: { agentId: string }) =>
  `${BLAND_API_BASE_URL}/v1/agents/${agentId}/authorize`;

export default BlandDemo;
