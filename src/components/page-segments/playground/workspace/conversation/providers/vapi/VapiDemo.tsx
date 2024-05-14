import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { VapiModelId, VapiVoiceId, getVapiModelConfig, getVapiVoiceConfig } from '.';

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
import Vapi from '@vapi-ai/web';
import { VapiModelPicker } from './components/VapiModelPicker';
import VapiVoicePicker from './components/VapiVoicePicker';
import VoiceOrb from '../../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import { isEmpty } from '../../../../../../../helpers/empty';
import { roundToNPlaces } from '../../../../../../../helpers/numbers';
import tinycolor from 'tinycolor2';
import { useConvoDemoDisabled } from '../../../hooks/useConvoDemoDisabled';
import { useLatencyTimer } from '../../../hooks/useLatencyTimer';
import { useOpacity } from '../../../../../../../hooks/animation';
import { useUserSpeechHandlers } from '../../../hooks/useIsUserSpeaking';

interface VapiDemoProps {}

const vapiBrandColor = '#5dfeca';

const VapiDemo: FunctionComponent<VapiDemoProps> = () => {
  const [modelId, setModelId] = useState(VapiModelId.OpenAIGPT3_5Turbo);
  const [voiceId, setVoiceId] = useState(VapiVoiceId.PlayHTJennifer);

  const [callState, setCallState] = useState<CallState>(CallState.Off);
  const [volume, setVolume] = useState(0);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);

  const [latencyReadings, setLatencyReadings] = useState<number[]>([]);
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

  const { vapiClient } = useVapi({
    setCallState,
    setVolume,
    recordLatencyReading,
    resetLatencyTimer,
    clearLatencyReadings,
    setAssistantIsSpeaking,
    stopSpeechRecognition
  });

  const onClick = useOnClick({ modelId, voiceId, vapiClient, callState, setCallState });
  const showCallConfigs = callState === CallState.Off;
  const showRealtimeStats = callState === CallState.Connected;
  const showLatencyTrace = callState === CallState.Connected;

  const disabled = useConvoDemoDisabled({ providerId: Providers.Vapi.id });

  const orbColor = tinycolor(vapiBrandColor).setAlpha(0.2).toRgbString();
  const className = clsx({
    'relative w-full h-full': true
  });

  return (
    <div className={className}>
      <div className="relative flex flex-col w-full h-full items-center justify-center">
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
          />
        )}

        {showRealtimeStats && (
          <RealtimeStats volume={volume} assistantIsSpeaking={assistantIsSpeaking} />
        )}
        {showLatencyTrace && <LatencyTrace latencyReadings={latencyReadings} />}

        <ConvoDemoLinks docsLink={Providers.Vapi.links.documentation} />
        <ConvoDemoLogoSymbol src={Providers.Vapi.logo.localPath} />
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
          <VapiModelPicker modelId={modelId} setModelId={setModelId} />
        </div>
        <VapiVoicePicker voiceId={voiceId} setVoiceId={setVoiceId} />
      </div>
    </div>
  );
};

const RealtimeStats = ({ assistantIsSpeaking, volume }) => {
  const animatedOpacity = useOpacity({ start: 0, end: 1, fadeInDelayMs: 0 });

  return (
    <div className="absolute top-0 left-0 w-fit h-fit" style={{ opacity: animatedOpacity }}>
      <div className="pt-3 pb-4 px-4 border-r border-r-stone-800 border-b border-b-stone-800 border-dashed">
        <VolumeStats volume={volume} />
      </div>
      <div className="pt-3 pb-4 px-4 border-r border-r-stone-800 border-b border-b-stone-800 border-dashed rounded-br-sm">
        <ConvoDemoTurnIndicator
          assistantIsSpeaking={assistantIsSpeaking}
          providerId={Providers.Vapi.id}
        />
      </div>
    </div>
  );
};

const VolumeStats = ({ volume }) => {
  const adjustedVolume = volume * 100;
  const displayVolume = roundToNPlaces({ value: volume, n: 6 });

  return (
    <div>
      <p className="text-neutral-300 text-sm inline">Volume: {displayVolume}</p>
      <Progress
        value={adjustedVolume}
        className="w-[125px] bg-neutral-700 mt-2 h-1.5"
        indicatorStyle={{ backgroundColor: vapiBrandColor }}
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

const useVapi = ({
  setCallState,
  setVolume,
  recordLatencyReading,
  resetLatencyTimer,
  clearLatencyReadings,
  setAssistantIsSpeaking,
  stopSpeechRecognition
}) => {
  const [vapiClient, setVapiClient] = useState(null);
  const { setActiveConvoProviderId } = useContext(PlaygroundContext);

  // set client on credentials available
  const { getCredentials, checkCredentialsSet } = useContext(CredentialsContext);
  const credentials = getCredentials({ providerId: Providers.Vapi.id });
  const credentialsSet = checkCredentialsSet({ providerId: Providers.Vapi.id });
  useEffect(() => {
    if (credentialsSet) {
      const { publicKey } = credentials;

      setVapiClient(new Vapi(publicKey));
    } else {
      setVapiClient(null);
    }
  }, [credentialsSet]);

  // wire event handlers
  useEffect(() => {
    if (vapiClient) {
      vapiClient.on('call-start', () => {
        setCallState(CallState.Connected);

        resetLatencyTimer();
        clearLatencyReadings();
        setActiveConvoProviderId(Providers.Vapi.id);
      });

      vapiClient.on('call-end', () => {
        setCallState(CallState.Off);

        setVolume(0);
        clearLatencyReadings();
        stopSpeechRecognition();
        setAssistantIsSpeaking(false);
        setActiveConvoProviderId(null);
      });

      vapiClient.on('speech-start', () => {
        setAssistantIsSpeaking(true);

        recordLatencyReading();
      });

      vapiClient.on('speech-end', () => {
        setAssistantIsSpeaking(false);
      });

      vapiClient.on('volume-level', (volume: number) => {
        setVolume(volume);
      });

      vapiClient.on('error', (e: any) => {
        console.error(e);
      });
    }
  }, [vapiClient]);

  return { vapiClient };
};

const useOnClick = ({ modelId, voiceId, vapiClient, callState, setCallState }) => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Providers.Vapi.id });

  const { openModal } = useContext(ModalContext);
  if (callState === CallState.Off && !credentialsSet) {
    return () => {
      openModal({ modalId: ModalId.SetVapiCredentials });
    };
  }

  const { systemPrompt, firstMessage, setActiveConvoProviderId } = useContext(PlaygroundContext);
  const startCall = () => {
    if (vapiClient) {
      setCallState(CallState.Connecting);

      vapiClient.start({
        transcriber: {
          provider: 'deepgram',
          model: 'nova-2',
          language: 'en-US'
        },
        model: getVapiModelConfig({ modelId, systemPrompt }),
        voice: getVapiVoiceConfig({ voiceId }),
        ...(!isEmpty(firstMessage) ? { firstMessage } : {})
      });

      setActiveConvoProviderId(Providers.Vapi.id);
    }
  };
  const stopCall = () => {
    if (vapiClient) {
      vapiClient.stop();

      setCallState(CallState.Off);
      setActiveConvoProviderId(null);
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

export default VapiDemo;
