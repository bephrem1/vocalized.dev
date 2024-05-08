import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';
import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import { CallState } from '../../../../../../types/call';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';

const VapiDemo: FunctionComponent<EmptyObject> = () => {
  const [callState, setCallState] = useState<CallState>(CallState.Off);
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

  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#5dfeca88" sizePx={190} callState={callState} onClick={onClick} />

      <ConvoDemoLogoSymbol src={Providers.Vapi.logo.localPath} />
      <ConvoDemoLinkToSiteBadge dest={Providers.Vapi.links.documentation} />
    </div>
  );
};

const useOnClick = ({ callState, setCallState }) => {
  const { openModal } = useContext(ModalContext);
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialSet = checkCredentialsSet({ providerId: Providers.Vapi.id });
  if (!credentialSet) {
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
