import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';

import { CallState } from '../../../../../../types/call';
import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';

const RetellDemo: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#ffffff" sizePx={190} callState={CallState.Off} />

      <ConvoDemoLogoSymbol src={Providers.Retell.logo.localPath} />
      <ConvoDemoLinkToSiteBadge dest={Providers.Retell.links.documentation} />
    </div>
  );
};

export default RetellDemo;
