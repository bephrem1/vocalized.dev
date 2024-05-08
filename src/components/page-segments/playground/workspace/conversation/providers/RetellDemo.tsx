import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';

import { CallState } from '../../../../../../types/call';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';

interface RetellDemoProps {
  disabled?: boolean;
}

const RetellDemo: FunctionComponent<RetellDemoProps> = ({ disabled }) => {
  return (
    <div className="relative w-full h-full">
      <VoiceOrb color="#ffffff" sizePx={190} callState={CallState.Off} disabled={disabled} />

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLogoSymbol src={Providers.Retell.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.Retell.links.documentation} />
      </div>
    </div>
  );
};

export default RetellDemo;
