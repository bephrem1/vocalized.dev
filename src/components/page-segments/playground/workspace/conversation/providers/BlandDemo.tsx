import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';

import { CallState } from '../../../../../../types/call';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';

interface BlandDemoProps {
  disabled?: boolean;
}

const BlandDemo: FunctionComponent<BlandDemoProps> = ({ disabled }) => {
  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#D1A7E9" sizePx={190} callState={CallState.Off} disabled={disabled} />

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLogoSymbol src={Providers.Bland.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.Bland.links.documentation} />
      </div>
    </div>
  );
};

export default BlandDemo;
