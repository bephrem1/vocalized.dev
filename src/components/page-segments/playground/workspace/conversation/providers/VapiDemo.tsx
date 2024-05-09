import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';
import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { CallState } from '../../../../../../types/call';
import { ConvoDemoControlButton } from '../components/ConvoDemoControlButton';
import ConvoDemoLatencyTrace from '../components/ConvoDemoLatencyTrace';
import { CredentialsContext } from '../../../../../../context/credentials';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { PlaygroundContext } from '../../../../../../context/playground';
import { Progress } from '../../../../../shared/shadcn/components/ui/progress';
import { Providers } from '../../../../../../fixtures/providers';
import Vapi from '@vapi-ai/web';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import { isEmpty } from '../../../../../../helpers/empty';
import { roundToNPlaces } from '../../../../../../helpers/numbers';
import tinycolor from 'tinycolor2';
import { useLatencyTimer } from '../hooks/useLatencyTimer';
import { useOpacity } from '../../../../../../hooks/animation';

interface VapiDemoProps {
  disabled?: boolean;
}

const vapiBrandColor = '#5dfeca';

const VapiDemo: FunctionComponent<VapiDemoProps> = ({ disabled = false }) => {
  const [callState, setCallState] = useState<CallState>(CallState.Off);
  const [volume, setVolume] = useState(0);

  const [latencyReadings, setLatencyReadings] = useState<number[]>([]);
  const clearLatencyReadings = () => setLatencyReadings([]);

  const { startLatencyTimer, readAndResetLatencyTimer } = useLatencyTimer();
  const recordLatencyReading = () => {
    const latencyMs = readAndResetLatencyTimer();

    if (!isEmpty(latencyMs)) {
      setLatencyReadings((prev) => [...prev, latencyMs]);
    }
  };

  const { vapiClient } = useVapi({
    setCallState,
    setVolume,
    startLatencyTimer,
    recordLatencyReading,
    clearLatencyReadings
  });

  const onClick = useOnClick({ callState, setCallState, vapiClient });
  // const showVolumeIndicator = callState === CallState.Connected;
  // const showLatencyTrace = callState === CallState.Connected;
  const showVolumeIndicator = true;
  const showLatencyTrace = true;

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
        {showVolumeIndicator && <VolumeIndicator volume={volume} />}
        {showLatencyTrace && <LatencyTrace latencyReadings={latencyReadings} />}

        <ConvoDemoLogoSymbol src={Providers.Vapi.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.Vapi.links.documentation} />
      </div>
    </div>
  );
};

const VolumeIndicator = ({ volume }) => {
  const animatedOpacity = useOpacity({ start: 0, end: 1, fadeInDelayMs: 0 });

  const adjustedVolume = volume * 100;
  const displayVolume = roundToNPlaces({ value: volume, n: 6 });

  return (
    <div
      className="absolute top-0 left-0 w-fit h-fit pl-5 pt-3.5 border-dashed border-r-neutral-100"
      style={{ opacity: animatedOpacity }}
    >
      <p className="text-neutral-300 text-sm inline">Volume: {displayVolume}</p>
      <Progress
        value={adjustedVolume}
        className="w-[125px] bg-neutral-700 mt-2 h-1.5"
        indicatorClassName={`bg-[${vapiBrandColor}]`}
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
  startLatencyTimer,
  recordLatencyReading,
  clearLatencyReadings
}) => {
  const [vapiClient, setVapiClient] = useState(null);

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
      });

      vapiClient.on('call-end', () => {
        setCallState(CallState.Off);
        setVolume(0);
        clearLatencyReadings();
      });

      vapiClient.on('speech-start', () => {
        console.log('assistant speech started');
        recordLatencyReading();
      });

      vapiClient.on('speech-end', () => {
        // handle assistant speech end
      });

      vapiClient.on('message', (data: any) => {
        const eventType = data?.type;
        if (eventType) {
          switch (eventType) {
            case 'speech-update':
              const role = data?.role;
              const status = data?.status;
              if (!isEmpty(role) && role === 'user' && !isEmpty(status) && status === 'stopped') {
                startLatencyTimer();
                console.log('user speech stopped');
              }

              break;
          }
        }
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

const useOnClick = ({ callState, setCallState, vapiClient }) => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Providers.Vapi.id });

  const { openModal } = useContext(ModalContext);
  const { systemPrompt, firstMessage } = useContext(PlaygroundContext);

  if (callState === CallState.Off && !credentialsSet) {
    return () => {
      openModal({ modalId: ModalId.SetVapiCredentials });
    };
  }

  const startCall = () => {
    if (vapiClient) {
      setCallState(CallState.Connecting);

      vapiClient.start({
        transcriber: {
          provider: 'deepgram',
          model: 'nova-2',
          language: 'en-US'
        },
        model: {
          provider: 'openai',
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            }
          ]
        },
        voice: {
          provider: 'playht',
          voiceId: 'jennifer'
        },
        ...(!isEmpty(firstMessage) ? { firstMessage } : {})
      });
    }
  };
  const stopCall = () => {
    if (vapiClient) {
      vapiClient.stop();

      setCallState(CallState.Off);
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
