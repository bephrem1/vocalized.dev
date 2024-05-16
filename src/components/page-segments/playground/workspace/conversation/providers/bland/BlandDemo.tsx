import { BlandModelId, BlandVoiceId } from '.';
import { FunctionComponent, useContext, useEffect, useState } from 'react';

import BlandModelPicker from './components/BlandModelPicker';
import BlandVoicePicker from './components/BlandVoicePicker';
import { BlandWebClient } from 'bland-client-js-sdk';
import { CallState } from '../../../../../../../types/call';
import { ConvoDemoControlButton } from '../../components/ConvoDemoControlButton';
import ConvoDemoLatencyTrace from '../../components/ConvoDemoLatencyTrace';
import ConvoDemoLinks from '../../components/ConvoDemoLinks';
import { ConvoDemoLogoSymbol } from '../../components';
import { ConvoDemoTurnIndicator } from '../../components/ConvoDemoTurnIndicator';
import { CredentialsContext } from '../../../../../../../context/credentials';
import { ModalContext } from '../../../../../../../context/modal';
import { ModalId } from '../../../../../../shared/modal/modal-id';
import { PlaygroundContext } from '../../../../../../../context/playground';
import { Progress } from '../../../../../../shared/shadcn/components/ui/progress';
import { Providers } from '../../../../../../../fixtures/providers';
import { UserSpeechRecognitionContext } from '../../../../../../../context/user-speech-recognition';
import VoiceOrb from '../../../../../../shared/voice/orb/VoiceOrb';
import axios from 'axios';
import clsx from 'clsx';
import { isEmpty } from '../../../../../../../helpers/empty';
import { roundToNPlaces } from '../../../../../../../helpers/numbers';
import tinycolor from 'tinycolor2';
import { useConvoDemoDisabled } from '../../hooks/useConvoDemoDisabled';
import { useLatencyTimer } from '../../hooks/useLatencyTimer';
import { useOpacity } from '../../../../../../../hooks/animation';
import { useSimulatedVolume } from '../../hooks/useSimulatedVolume';
import { useToast } from '../../../../../../shared/shadcn/components/ui/use-toast';
import { useUserSpeechHandlers } from '../../hooks/useIsUserSpeaking';

interface BlandDemoProps {
  index: number;
}

const blandBrandColor = '#6C66E7';

const BlandDemo: FunctionComponent<BlandDemoProps> = ({ index }) => {
  const [blandClient, setBlandClient] = useState<BlandWebClient>(null);

  const [modelId, setModelId] = useState(BlandModelId.Base);
  const [voiceId, setVoiceId] = useState(BlandVoiceId.Tina);

  const [callState, setCallState] = useState<CallState>(CallState.Off);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);

  const { volume } = useSimulatedVolume({ assistantIsSpeaking });

  const [latencyReadings, setLatencyReadings] = useState<Array<number>>([]);
  const addLatencyReading = (latencyMs: number) =>
    setLatencyReadings((prev) => [latencyMs, ...prev]);
  const clearLatencyReadings = () => setLatencyReadings([]);

  const { startLatencyTimer, readAndResetLatencyTimer, resetLatencyTimer } = useLatencyTimer();
  const recordLatencyReading = () => {
    const latencyMs = readAndResetLatencyTimer();

    if (!isEmpty(latencyMs)) {
      addLatencyReading(latencyMs);
    }
  };

  const { isUserSpeaking, stopSpeechRecognition } = useContext(UserSpeechRecognitionContext);
  const handleUserSpeechEnd = () => {
    startLatencyTimer();
  };
  useUserSpeechHandlers({
    isUserSpeaking,
    onUserSpeechEnd: handleUserSpeechEnd
  });

  useBland({
    setCallState,
    recordLatencyReading,
    resetLatencyTimer,
    clearLatencyReadings,
    setAssistantIsSpeaking,
    stopSpeechRecognition,
    blandClient
  });

  const onClick = useOnClick({
    modelId,
    voiceId,
    callState,
    setCallState,
    blandClient,
    setBlandClient
  });
  const showCallConfigs = callState === CallState.Off;
  const showRealtimeStats = callState === CallState.Connected;
  const showLatencyTrace = callState === CallState.Connected;

  const disabled = useConvoDemoDisabled({ providerId: Providers.Bland.id });
  const orbColor = tinycolor(blandBrandColor).setAlpha(0.2).lighten(15).toRgbString();

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb
          color={orbColor}
          sizePx={175}
          volume={volume}
          callState={CallState.Off}
          onClick={onClick}
          disabled={disabled}
        />
        <ConvoDemoControlButton callState={callState} disabled={disabled} onClick={onClick} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        {showCallConfigs && (
          <CallConfigs
            modelId={modelId}
            setModelId={setModelId}
            voiceId={voiceId}
            setVoiceId={setVoiceId}
          />
        )}
        {showRealtimeStats && (
          <RealtimeStats volume={volume} assistantIsSpeaking={assistantIsSpeaking} />
        )}

        {showLatencyTrace && <LatencyTrace latencyReadings={latencyReadings} />}

        <ConvoDemoLinks docsLink={Providers.Bland.links.documentation} />
        <ConvoDemoLogoSymbol src={Providers.Bland.logo.localPath} />
      </div>
    </div>
  );
};

const CallConfigs = ({ modelId, setModelId, voiceId, setVoiceId }) => {
  const animatedOpacity = useOpacity({ start: 0, end: 1, fadeInDelayMs: 0 });

  return (
    <div className="absolute top-0 left-0 w-fit h-fit" style={{ opacity: animatedOpacity }}>
      <div className="pt-5 pl-5">
        <div className="mb-2">
          <BlandModelPicker modelId={modelId} setModelId={setModelId} />
        </div>
        <div className="mb-2">
          <BlandVoicePicker voiceId={voiceId} setVoiceId={setVoiceId} />
        </div>
      </div>
    </div>
  );
};

const RealtimeStats = ({ volume, assistantIsSpeaking }) => {
  const animatedOpacity = useOpacity({ start: 0, end: 1, fadeInDelayMs: 0 });

  return (
    <div className="absolute top-0 left-0 w-[194px] h-fit" style={{ opacity: animatedOpacity }}>
      <div className="pt-3 pb-4 px-4 border-r border-r-stone-800 border-b border-b-stone-800 border-dashed">
        <VolumeStats volume={volume} />
      </div>
      <div className="pt-3 pb-4 px-4 border-r border-r-stone-800 border-b border-b-stone-800 border-dashed rounded-br-sm">
        <ConvoDemoTurnIndicator
          assistantIsSpeaking={assistantIsSpeaking}
          providerId={Providers.Bland.id}
        />
      </div>
    </div>
  );
};

const VolumeStats = ({ volume }) => {
  const adjustedVolume = volume * 100;
  const displayVolume = roundToNPlaces({ value: volume, n: 3 });

  const activeBarColor = tinycolor(blandBrandColor).lighten(20).toRgbString();

  return (
    <div>
      <span className="whitespace-nowrap">
        <p className="text-neutral-300 text-sm inline">Volume </p>
        <p className="text-neutral-400 text-xs inline">(simulated): </p>
        <p className="text-neutral-300 text-sm inline"> {displayVolume}</p>
      </span>
      <Progress
        value={adjustedVolume}
        className="w-[125px] bg-neutral-700 mt-2 h-1.5"
        indicatorStyle={{ backgroundColor: activeBarColor }}
      />
    </div>
  );
};

const LatencyTrace = ({ latencyReadings }) => {
  const animatedOpacity = useOpacity({ start: 0, end: 1, fadeInDelayMs: 0 });

  return (
    <div
      className="absolute top-0 right-0 w-fit h-fit pr-5 pt-3.5 border-dashed border-r-neutral-100"
      style={{ opacity: animatedOpacity }}
    >
      <ConvoDemoLatencyTrace readings={latencyReadings} />
    </div>
  );
};

const useBland = ({
  setCallState,
  recordLatencyReading,
  resetLatencyTimer,
  clearLatencyReadings,
  setAssistantIsSpeaking,
  stopSpeechRecognition,
  blandClient
}) => {
  const { setActiveConvoProviderId } = useContext(PlaygroundContext);

  useEffect(() => {
    if (blandClient) {
      blandClient.on('conversationStarted', () => {
        setCallState(CallState.Connected);

        resetLatencyTimer();
        clearLatencyReadings();
        setActiveConvoProviderId(Providers.Bland.id);
      });

      blandClient.on('conversationEnded', () => {
        setCallState(CallState.Off);

        clearLatencyReadings();
        stopSpeechRecognition();
        setAssistantIsSpeaking(false);
        setActiveConvoProviderId(null);
      });

      blandClient.on('agentStartTalking', () => {
        setAssistantIsSpeaking(true);

        recordLatencyReading();
      });

      blandClient.on('agentStopTalking', () => {
        setAssistantIsSpeaking(false);
      });

      blandClient.on('error', (e: any) => {
        console.error(e);
      });
    }
  }, [blandClient]);
};

const useOnClick = ({ modelId, voiceId, callState, setCallState, blandClient, setBlandClient }) => {
  const { toast } = useToast();

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

      const { agentId, callToken } = await setupCall({
        systemPrompt,
        firstMessage,
        modelId,
        voiceId,
        apiKey: credentials.apiKey
      });

      if (!isEmpty(agentId) && !isEmpty(callToken)) {
        const callClient = new BlandWebClient(agentId, callToken);
        setBlandClient(callClient);

        callClient.initConversation({ sampleRate: 44100 } as any).then(() => {
          setCallState(CallState.Connected);
        });
      } else {
        if (isEmpty(agentId)) {
          toast({
            title: 'Failed to create Bland agent',
            description: 'There was an issue creating your Bland agent for the web call.',
            variant: 'destructive'
          });
        } else if (isEmpty(callToken)) {
          toast({
            title: 'Failed to authorize web call',
            description: 'There was an issue authorizing your web call with Bland.',
            variant: 'destructive'
          });
        }

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
  if (!isEmpty(agentId)) {
    const { callToken } = await authroizeWebCall({ agentId, apiKey });

    return { agentId, callToken };
  }

  return { agentId: null, callToken: null };
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
