import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';

import { CallState } from '../../../../../../types/call';
import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';

const BlandDemo: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#D1A7E9" sizePx={190} callState={CallState.Off} />

      <ConvoDemoLogoSymbol src={Providers.Bland.logo.localPath} />
      <ConvoDemoLinkToSiteBadge dest={Providers.Bland.links.documentation} />
    </div>
  );
};

export default BlandDemo;
