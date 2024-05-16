import { FunctionComponent, useContext, useState } from 'react';
import { RetellModelId, RetellSampleRate, RetellVoiceId } from '.';

import { CallState } from '../../../../../../../types/call';
import ConvoDemoClose from '../../components/ConvoDemoClose';
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
import RetellModelPicker from './components/RetellModelPicker';
import RetellVoicePicker from './components/RetellVoicePicker';
import { RetellWebClient } from 'retell-client-js-sdk';
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
import { useUserSpeechHandlers } from '../../hooks/useIsUserSpeaking';

interface RetellDemoProps {
  index: number;
}

const retellBrandColor = '#ffffff';

const RetellClient = new RetellWebClient();

const RetellDemo: FunctionComponent<RetellDemoProps> = ({ index }) => {
  const [modelId, setModelId] = useState(RetellModelId.OpenAIGPT3_5Turbo);
  const [voiceId, setVoiceId] = useState(RetellVoiceId.ElevenLabsMarissa);
  const [sampleRate, setSampleRate] = useState(RetellSampleRate.SAMPLE_RATE_44100);

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

  useRetell({
    setCallState,
    recordLatencyReading,
    resetLatencyTimer,
    clearLatencyReadings,
    setAssistantIsSpeaking,
    stopSpeechRecognition
  });

  const onClick = useOnClick({ modelId, voiceId, sampleRate, callState, setCallState });
  const showCallConfigs = callState === CallState.Off;
  const showRealtimeStats = callState === CallState.Connected;
  const showLatencyTrace = callState === CallState.Connected;

  const disabled = useConvoDemoDisabled({ providerId: Providers.Retell.id });
  const orbColor = tinycolor(retellBrandColor).setAlpha(0.2).toRgbString();

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb
          color={orbColor}
          sizePx={175}
          callState={callState}
          volume={volume}
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
            sampleRate={sampleRate}
            setSampleRate={setSampleRate}
          />
        )}
        {showRealtimeStats && (
          <RealtimeStats volume={volume} assistantIsSpeaking={assistantIsSpeaking} />
        )}

        <ConvoDemoClose demoIndex={index} />
        {showLatencyTrace && <LatencyTrace latencyReadings={latencyReadings} />}

        <ConvoDemoLinks docsLink={Providers.Retell.links.documentation} />
        <ConvoDemoLogoSymbol src={Providers.Retell.logo.localPath} />
      </div>
    </div>
  );
};

const CallConfigs = ({ modelId, setModelId, voiceId, setVoiceId, sampleRate, setSampleRate }) => {
  const animatedOpacity = useOpacity({ start: 0, end: 1, fadeInDelayMs: 0 });

  return (
    <div className="absolute top-0 left-0 w-fit h-fit" style={{ opacity: animatedOpacity }}>
      <div className="pt-5 pl-5">
        <div className="mb-2">
          <RetellModelPicker modelId={modelId} setModelId={setModelId} />
        </div>
        <div className="mb-2">
          <RetellVoicePicker voiceId={voiceId} setVoiceId={setVoiceId} />
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
          providerId={Providers.Retell.id}
        />
      </div>
    </div>
  );
};

const VolumeStats = ({ volume }) => {
  const adjustedVolume = volume * 100;
  const displayVolume = roundToNPlaces({ value: volume, n: 3 });

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
        indicatorStyle={{ backgroundColor: retellBrandColor }}
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

const useRetell = ({
  setCallState,
  recordLatencyReading,
  resetLatencyTimer,
  clearLatencyReadings,
  setAssistantIsSpeaking,
  stopSpeechRecognition
}) => {
  const { setActiveConvoProviderId } = useContext(PlaygroundContext);

  RetellClient.on('conversationStarted', () => {
    setCallState(CallState.Connected);

    resetLatencyTimer();
    clearLatencyReadings();
    setActiveConvoProviderId(Providers.Retell.id);
  });

  RetellClient.on('conversationEnded', () => {
    setCallState(CallState.Off);

    clearLatencyReadings();
    stopSpeechRecognition();
    setAssistantIsSpeaking(false);
    setActiveConvoProviderId(null);
  });

  RetellClient.on('agentStartTalking', () => {
    setAssistantIsSpeaking(true);

    recordLatencyReading();
  });

  RetellClient.on('agentStopTalking', () => {
    setAssistantIsSpeaking(false);
  });

  RetellClient.on('error', (e) => {
    console.error(e);
  });
};

const useOnClick = ({ modelId, voiceId, sampleRate, callState, setCallState }) => {
  const { getCredentials, checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Providers.Retell.id });

  const { openModal } = useContext(ModalContext);
  if (callState === CallState.Off && !credentialsSet) {
    return () => {
      openModal({ modalId: ModalId.SetRetellCredentials });
    };
  }

  const { systemPrompt, firstMessage, setActiveConvoProviderId } = useContext(PlaygroundContext);
  const startCall = async () => {
    const credentials = getCredentials({ providerId: Providers.Retell.id });
    const apiKeySet = !isEmpty(credentials) && credentials.apiKey;

    if (apiKeySet) {
      setCallState(CallState.Connecting);
      setActiveConvoProviderId(Providers.Retell.id);

      const { callId } = await setupCall({
        systemPrompt,
        firstMessage,
        modelId,
        voiceId,
        sampleRate,
        apiKey: credentials.apiKey
      });
      if (callId) {
        RetellClient.startConversation({
          callId,
          sampleRate,
          enableUpdate: true
        });
      } else {
        setCallState(CallState.Off);
        setActiveConvoProviderId(null);
      }
    }
  };
  const stopCall = () => {
    RetellClient.stopConversation();

    setCallState(CallState.Off);
    setActiveConvoProviderId(null);
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

const setupCall = async ({ systemPrompt, firstMessage, modelId, voiceId, sampleRate, apiKey }) => {
  const { llmWebsocketUrl } = await createRetellLLM({
    systemPrompt,
    firstMessage,
    modelId,
    apiKey
  });
  if (llmWebsocketUrl) {
    const { agentId } = await createAgent({ voiceId, llmWebsocketUrl, apiKey });

    if (agentId) {
      const { callId } = await registerCall({ agentId, sampleRate, apiKey });

      return { callId };
    }
  }

  return { callId: null };
};

const createRetellLLM = async ({ systemPrompt, firstMessage, modelId, apiKey }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: getCreateRetellLLMUrl(),
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      data: {
        model: modelId,
        general_prompt: systemPrompt,
        ...(!isEmpty(firstMessage) ? { begin_message: firstMessage } : {})
      }
    });

    const { llm_websocket_url } = response.data;

    return { llmWebsocketUrl: llm_websocket_url };
  } catch (error) {
    console.error('Error creating Retell LLM', error);
  }

  return { llmWebsocketUrl: null };
};
const createAgent = async ({ voiceId, llmWebsocketUrl, apiKey }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: getCreateAgentUrl(),
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      data: {
        llm_websocket_url: llmWebsocketUrl,
        agent_name: 'Vocalized Test Agent',
        voice_id: voiceId,
        responsiveness: 0,
        interruption_sensitivity: 1,
        enable_backchannel: true,
        backchannel_frequency: 0.8,
        reminder_trigger_ms: 5000,
        language: 'en-US'
      }
    });

    const { agent_id } = response.data;

    return { agentId: agent_id };
  } catch (error) {
    console.error('Error creating Retell agent', error);
  }

  return { agentId: null };
};
const registerCall = async ({ agentId, sampleRate, apiKey }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: getRegisterCallUrl(),
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      data: {
        agent_id: agentId,
        audio_websocket_protocol: 'web',
        audio_encoding: 's16le',
        sample_rate: sampleRate,
        end_call_after_silence_ms: 10000
      }
    });

    const { call_id } = response.data;

    return { callId: call_id };
  } catch (error) {
    console.error('Error registering Retell call', error);
  }

  return { callId: null };
};

const RETELL_API_BASE_URL = 'https://api.retellai.com';
const getCreateRetellLLMUrl = () => `${RETELL_API_BASE_URL}/create-retell-llm`;
const getCreateAgentUrl = () => `${RETELL_API_BASE_URL}/create-agent`;
const getRegisterCallUrl = () => `${RETELL_API_BASE_URL}/register-call`;

export default RetellDemo;
