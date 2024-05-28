import { CallState } from '../../../../../../types/call';
import ConvoDemoLinks from '../components/ConvoDemoLinks';
import { ConvoDemoLogoSymbol } from '../components';
import { FunctionComponent } from 'react';
import { Projects } from '../../../../../../fixtures/projects';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import { useConvoDemoDisabled } from '../hooks/useConvoDemoDisabled';

interface PlayAIDemoProps {}

const PlayAIDemo: FunctionComponent<PlayAIDemoProps> = () => {
  const disabled = useConvoDemoDisabled({ providerId: Projects.PlayAI.id });

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb color="#FFD1A5" sizePx={175} callState={CallState.Off} disabled={disabled} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLinks docsLink={Projects.PlayAI.siteLinks.documentation} />
        <ConvoDemoLogoSymbol src={Projects.PlayAI.logo.localPath} />
      </div>
    </div>
  );
};

export default PlayAIDemo;
