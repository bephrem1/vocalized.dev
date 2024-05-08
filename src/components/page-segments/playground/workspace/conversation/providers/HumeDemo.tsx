import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';

import { CallState } from '../../../../../../types/call';
import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';

const HumeDemo: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#FFD1A5" sizePx={190} callState={CallState.Off} />

      <ConvoDemoLogoSymbol src={Providers.Hume.logo.localPath} />
      <ConvoDemoLinkToSiteBadge dest={Providers.Hume.links.documentation} />
    </div>
  );
};

export default HumeDemo;
