import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';

import { CallState } from '../../../../../../types/call';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';

interface PlayAIDemoProps {
  disabled?: boolean;
}

const PlayAIDemo: FunctionComponent<PlayAIDemoProps> = ({ disabled }) => {
  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb color="#FFD1A5" sizePx={175} callState={CallState.Off} disabled={disabled} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLogoSymbol src={Providers.PlayAI.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.PlayAI.links.documentation} label="docs" />
      </div>
    </div>
  );
};

export default PlayAIDemo;
