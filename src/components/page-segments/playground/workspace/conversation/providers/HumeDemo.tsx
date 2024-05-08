import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';

import { CallState } from '../../../../../../types/call';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';

interface HumeDemoProps {
  disabled?: boolean;
}

const HumeDemo: FunctionComponent<HumeDemoProps> = ({ disabled }) => {
  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#FFD1A5" sizePx={190} callState={CallState.Off} disabled={disabled} />

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLogoSymbol src={Providers.Hume.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.Hume.links.documentation} />
      </div>
    </div>
  );
};

export default HumeDemo;
