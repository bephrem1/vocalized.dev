import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import { CallState } from '../../../../../../types/call';
import { ConvoDemoLinkToSiteBadge } from '../components';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';

const VapiDemo: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialSet = checkCredentialsSet({ providerId: Providers.Vapi.id });

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

  const onClick = getOnClick({ callState, setCallState });

  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#5dfeca88" sizePx={190} callState={callState} onClick={onClick} />

      <LogoSymbol />
      <ConvoDemoLinkToSiteBadge dest={Providers.Vapi.links.documentation} />
    </div>
  );
};

const getOnClick = ({ callState, setCallState }) => {
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

const LogoSymbol = () => {
  return (
    <div className="absolute bottom-2 right-2">
      <img src={Providers.Vapi.logo.localPath} className="w-10 h-10 rounded-sm" draggable={false} />
    </div>
  );
};

export default VapiDemo;
