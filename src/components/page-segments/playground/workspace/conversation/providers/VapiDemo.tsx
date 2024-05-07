import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';

const VapiDemo: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="relative w-full h-full">
      <VoiceOrb sizePx={200} />

      <LogoSymbol />
    </div>
  );
};

const LogoSymbol = () => {
  return (
    <div className="absolute bottom-2 right-2">
      <img src={Providers.Vapi.logo.localPath} className="w-10 h-10 rounded-sm" draggable={false} />
    </div>
  );
};

export default VapiDemo;
