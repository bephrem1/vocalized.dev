import { FunctionComponent, useContext, useState } from 'react';
import { VoiceProvider, useVoice } from '@humeai/voice-react';

import { CallState } from '../../../../../../../types/call';
import { ConvoDemoControlButton } from '../../components/ConvoDemoControlButton';
import ConvoDemoLatencyTrace from '../../components/ConvoDemoLatencyTrace';
import ConvoDemoLinks from '../../components/ConvoDemoLinks';
import { ConvoDemoLogoSymbol } from '../../components';
import { ConvoDemoTurnIndicator } from '../../components/ConvoDemoTurnIndicator';
import { CredentialsContext } from '../../../../../../../context/credentials';
import Environment from '../../../../../../../Environment';
import { HumeModelId } from '.';
import HumeModelPicker from './components/HumeModelPicker';
import { ModalContext } from '../../../../../../../context/modal';
import { ModalId } from '../../../../../../shared/modal/modal-id';
import { PlaygroundContext } from '../../../../../../../context/playground';
import { Progress } from '../../../../../../shared/shadcn/components/ui/progress';
import { Providers } from '../../../../../../../fixtures/providers';
import { UserSpeechRecognitionContext } from '../../../../../../../context/user-speech-recognition';
import VoiceOrb from '../../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import { isEmpty } from '../../../../../../../helpers/empty';
import { roundToNPlaces } from '../../../../../../../helpers/numbers';
import tinycolor from 'tinycolor2';
import { useConvoDemoDisabled } from '../../../hooks/useConvoDemoDisabled';
import { useLatencyTimer } from '../../../hooks/useLatencyTimer';
import { useOpacity } from '../../../../../../../hooks/animation';
import { useSimulatedVolume } from '../../../hooks/useSimulatedVolume';
import { useUserSpeechHandlers } from '../../../hooks/useIsUserSpeaking';

interface HumeDemoProps {}

const humeBrandColor = '#fadd98';

const HumeDemo: FunctionComponent<HumeDemoProps> = () => {
  const { getCredentials } = useContext(CredentialsContext);
  const credentials = getCredentials({ providerId: Providers.Hume.id });
  const humeApiKey =
    !isEmpty(credentials) && !isEmpty(credentials.apiKey) ? credentials.apiKey : '';

  const [modelId, setModelId] = useState(HumeModelId.Default);

  const [callState, setCallState] = useState<CallState>(CallState.Off);
  const [userHasSpoken, setUserHasSpoken] = useState(false);
  const {
    onMessage,
    onClose,
    sessionSettings,
    latencyReadings,
    resetLatencyTimer,
    clearLatencyReadings
  } = useCallSetup({ setCallState, userHasSpoken, setUserHasSpoken });

  return (
    <div className="relative w-full h-full">
      <VoiceProvider
        auth={{ type: 'apiKey', value: humeApiKey }}
        reconnectAttempts={5}
        debug={Environment.isDevelopment(process.env.NODE_ENV)}
        onMessage={onMessage}
        onClose={onClose}
        sessionSettings={sessionSettings}
      >
        <HumeDemoInternal
          modelId={modelId}
          setModelId={setModelId}
          callState={callState}
          setCallState={setCallState}
          latencyReadings={latencyReadings}
          resetLatencyTimer={resetLatencyTimer}
          clearLatencyReadings={clearLatencyReadings}
          userHasSpoken={userHasSpoken}
          setUserHasSpoken={setUserHasSpoken}
        />
      </VoiceProvider>
    </div>
  );
};

const useCallSetup = ({ setCallState, userHasSpoken, setUserHasSpoken }) => {
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

  const { systemPrompt, setActiveConvoProviderId } = useContext(PlaygroundContext);
  const onMessage = (message: any) => {
    if (message.type === 'assistant_message') {
      recordLatencyReading();
    } else if (message.type === 'user_message') {
      if (!userHasSpoken) {
        setUserHasSpoken(true);
      }
    }
  };
  const onClose = () => {
    setCallState(CallState.Off);

    clearLatencyReadings();
    stopSpeechRecognition();
    setActiveConvoProviderId(null);
  };

  return {
    onMessage,
    onClose,
    sessionSettings: { systemPrompt },
    latencyReadings,
    resetLatencyTimer,
    clearLatencyReadings
  };
};

interface HumeDemoInternalProps {
  modelId: HumeModelId;
  setModelId: (modelId: HumeModelId) => void;
  callState: CallState;
  setCallState: (callState: CallState) => void;
  latencyReadings: Array<number>;
  resetLatencyTimer: () => void;
  clearLatencyReadings: () => void;
  userHasSpoken: boolean;
  setUserHasSpoken: (userHasSpoken: boolean) => void;
}

const HumeDemoInternal: FunctionComponent<HumeDemoInternalProps> = ({
  modelId,
  setModelId,
  callState,
  setCallState,
  latencyReadings,
  resetLatencyTimer,
  clearLatencyReadings,
  userHasSpoken,
  setUserHasSpoken
}) => {
  const { isPlaying: assistantIsSpeaking } = useVoice();
  const { volume } = useSimulatedVolume({ assistantIsSpeaking });

  const onClick = useOnClick({
    callState,
    setCallState,
    resetLatencyTimer,
    clearLatencyReadings,
    setUserHasSpoken
  });
  const showCallConfigs = callState === CallState.Off;
  const showRealtimeStats = callState === CallState.Connected;
  const showLatencyTrace = callState === CallState.Connected;

  const disabled = useConvoDemoDisabled({ providerId: Providers.Hume.id });
  const orbColor = tinycolor(humeBrandColor).setAlpha(0.2).toRgbString();
  const speakFirstPillVisible = callState === CallState.Connected && !userHasSpoken;

  return (
    <>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="relative flex flex-col items-center justify-center">
          <SpeakFirstPill visible={speakFirstPillVisible} />
          <VoiceOrb
            color={orbColor}
            sizePx={175}
            callState={callState}
            volume={volume}
            onClick={onClick}
            disabled={disabled}
          />
        </div>

        <ConvoDemoControlButton callState={callState} disabled={disabled} onClick={onClick} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        {showCallConfigs && <CallConfigs modelId={modelId} setModelId={setModelId} />}

        {showRealtimeStats && (
          <RealtimeStats volume={volume} assistantIsSpeaking={assistantIsSpeaking} />
        )}
        {showLatencyTrace && <LatencyTrace latencyReadings={latencyReadings} />}

        <ConvoDemoLinks
          docsLink={Providers.Hume.links.documentation}
          playgroundLink={Providers.Hume.links.playground}
        />
        <ConvoDemoLogoSymbol src={Providers.Hume.logo.localPath} />
      </div>
    </>
  );
};

const CallConfigs = ({ modelId, setModelId }) => {
  const animatedOpacity = useOpacity({ start: 0, end: 1, fadeInDelayMs: 0 });

  return (
    <div className="absolute top-0 left-0 w-fit h-fit" style={{ opacity: animatedOpacity }}>
      <div className="pt-5 pl-5">
        <HumeModelPicker modelId={modelId} setModelId={setModelId} />
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
          providerId={Providers.Vapi.id}
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
        indicatorStyle={{ backgroundColor: humeBrandColor }}
      />
    </div>
  );
};

const SpeakFirstPill = ({ visible }) => {
  const className = clsx({
    'absolute bottom-full mb-7': true,
    'w-fit h-fit px-4 py-1': true,
    'bg-gray-700 border border-solid border-gray-500': true,
    'rounded-full select-none': true,
    'transition-opacity duration-500': true,
    'bg-opacity-80': true,
    'opacity-0': !visible,
    'opacity-100': visible
  });

  return (
    <div className={className} style={{ transition: 'opacity 0.5s' }}>
      <p className="text-neutral-200 text-xs">you must speak first</p>
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

const useOnClick = ({
  callState,
  setCallState,
  resetLatencyTimer,
  clearLatencyReadings,
  setUserHasSpoken
}) => {
  const { setActiveConvoProviderId } = useContext(PlaygroundContext);
  const { connect, disconnect } = useVoice();

  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Providers.Hume.id });

  const { openModal } = useContext(ModalContext);
  if (callState === CallState.Off && !credentialsSet) {
    return () => {
      openModal({ modalId: ModalId.SetHumeCredentials });
    };
  }

  const startCall = () => {
    setCallState(CallState.Connecting);
    setActiveConvoProviderId(Providers.Hume.id);

    connect()
      .then(() => {
        setCallState(CallState.Connected);

        setUserHasSpoken(false);
        resetLatencyTimer();
        clearLatencyReadings();
        setActiveConvoProviderId(Providers.Hume.id);
      })
      .catch(() => {
        setCallState(CallState.Off);
        setActiveConvoProviderId(null);
      });
  };
  const stopCall = () => {
    disconnect();

    setCallState(CallState.Off);
    setActiveConvoProviderId(null);
    setUserHasSpoken(false);
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

export default HumeDemo;
