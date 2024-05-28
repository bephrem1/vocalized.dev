import { CallState } from '../../../../../../types/call';
import ConvoDemoLinks from '../components/ConvoDemoLinks';
import { ConvoDemoLogoSymbol } from '../components';
import { FunctionComponent } from 'react';
import { Projects } from '../../../../../../fixtures/projects';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import { useConvoDemoDisabled } from '../hooks/useConvoDemoDisabled';

interface VocodeDemoProps {}

const VocodeDemo: FunctionComponent<VocodeDemoProps> = () => {
  const disabled = useConvoDemoDisabled({ providerId: Projects.Vocode.id });

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb color="#ffffff" sizePx={175} callState={CallState.Off} disabled={disabled} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLinks docsLink={Projects.Vocode.siteLinks.documentation} />
        <ConvoDemoLogoSymbol src={Projects.Vocode.logo.localPath} />
      </div>
    </div>
  );
};

export default VocodeDemo;
