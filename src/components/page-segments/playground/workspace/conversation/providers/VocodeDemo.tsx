import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';

import { CallState } from '../../../../../../types/call';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';

interface VocodeDemoProps {
  disabled?: boolean;
}

const VocodeDemo: FunctionComponent<VocodeDemoProps> = ({ disabled }) => {
  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb color="#ffffff" sizePx={175} callState={CallState.Off} disabled={disabled} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLogoSymbol src={Providers.Vocode.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.Vocode.links.documentation} label="docs" />
      </div>
    </div>
  );
};

export default VocodeDemo;
