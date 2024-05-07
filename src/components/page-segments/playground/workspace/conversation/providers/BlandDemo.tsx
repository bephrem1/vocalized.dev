import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';

const BlandDemo: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#D1A7E9" sizePx={200} />

      <LogoSymbol />
    </div>
  );
};

const LogoSymbol = () => {
  return (
    <div className="absolute bottom-2 right-2">
      <img
        src={Providers.Bland.logo.localPath}
        className="w-10 h-10 rounded-sm"
        draggable={false}
      />
    </div>
  );
};

export default BlandDemo;
