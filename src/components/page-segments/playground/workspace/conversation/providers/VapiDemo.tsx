import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';
import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import { Button } from '../../../../../shared/shadcn/components/ui/button';
import { CallState } from '../../../../../../types/call';
import { ConvoDemoControlButton } from '../components/ConvoDemoControlButton';
import { CredentialsContext } from '../../../../../../context/credentials';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface VapiDemoProps {
  disabled?: boolean;
}

const VapiDemo: FunctionComponent<VapiDemoProps> = ({ disabled = false }) => {
  const [callState, setCallState] = useState<CallState>(CallState.Connected);
  const [volume, setVolume] = useState(0);
  const volumeIntervalRef = useRef(null);

  useEffect(() => {
    if (callState === CallState.Connected) {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
      volumeIntervalRef.current = setInterval(() => {
        setVolume(Math.random());
      }, 200);
    }

    return () => {
      clearInterval(volumeIntervalRef.current);
    };
  }, [callState]);

  const onClick = useOnClick({ callState, setCallState });

  const className = clsx({
    'relative w-full h-full': true
  });

  return (
    <div className={className}>
      <div className="relative flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb
          color="#5dfeca88"
          sizePx={190}
          callState={callState}
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

const useOnClick = ({ callState, setCallState }) => {
  const { openModal } = useContext(ModalContext);
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialSet = checkCredentialsSet({ providerId: Providers.Vapi.id });
  if (callState === CallState.Off && !credentialSet) {
    return () => {
      openModal({ modalId: ModalId.SetVapiCredentials });
    };
  }

  const startCall = () => {
    setCallState(CallState.Connecting);

    setTimeout(() => {
      setCallState(CallState.Connected);
    }, 2000);
  };
  const stopCall = () => {
    setCallState(CallState.Off);
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
