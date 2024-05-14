import { CallState } from '../../../../../../types/call';
import ConvoDemoLinks from '../components/ConvoDemoLinks';
import { ConvoDemoLogoSymbol } from '../components';
import { FunctionComponent } from 'react';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import { useConvoDemoDisabled } from '../../hooks/useConvoDemoDisabled';

interface HumeDemoProps {}

const HumeDemo: FunctionComponent<HumeDemoProps> = () => {
  const disabled = useConvoDemoDisabled({ providerId: Providers.Hume.id });

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb color="#FFD1A5" sizePx={175} callState={CallState.Off} disabled={disabled} />
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLinks
          docsLink={Providers.Hume.links.documentation}
          playgroundLink={Providers.Hume.links.playground}
        />
        <ConvoDemoLogoSymbol src={Providers.Hume.logo.localPath} />
      </div>
    </div>
  );
};

export default HumeDemo;
