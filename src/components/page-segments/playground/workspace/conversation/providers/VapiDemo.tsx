import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';
import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import { CallState } from '../../../../../../types/call';
import { ConvoDemoControlButton } from '../components/ConvoDemoControlButton';
import { CredentialsContext } from '../../../../../../context/credentials';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { PlaygroundContext } from '../../../../../../context/playground';
import { Providers } from '../../../../../../fixtures/providers';
import Vapi from '@vapi-ai/web';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import { isEmpty } from '../../../../../../helpers/empty';

interface VapiDemoProps {
  disabled?: boolean;
}

const VapiDemo: FunctionComponent<VapiDemoProps> = ({ disabled = false }) => {
  const [callState, setCallState] = useState<CallState>(CallState.Off);
  const [volume, setVolume] = useState(0);

  const { vapiClient } = useVapi({ setCallState, setVolume });

  const onClick = useOnClick({ callState, setCallState, vapiClient });
  const className = clsx({
    'relative w-full h-full': true
  });

  return (
    <div className={className}>
      <div className="relative flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb
          color="#5dfeca88"
          sizePx={175}
          callState={callState}
          volume={volume}
          onClick={onClick}
          disabled={disabled}
        />
        <ConvoDemoControlButton callState={callState} disabled={disabled} onClick={onClick} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLogoSymbol src={Providers.Vapi.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.Vapi.links.documentation} />
      </div>
    </div>
  );
};

const useVapi = ({ setCallState, setVolume }) => {
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
      });

      vapiClient.on('speech-start', () => {
        setCallState(CallState.Connected);

        console.log('Assistant speech has started.');
      });

      vapiClient.on('speech-end', () => {
        setCallState(CallState.Connected);

        console.log('Assistant speech has ended.');
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
    setCallState(CallState.Connecting);

    if (vapiClient) {
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
