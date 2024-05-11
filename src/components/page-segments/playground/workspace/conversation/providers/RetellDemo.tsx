import { ConvoDemoLinkToSiteBadge, ConvoDemoLogoSymbol } from '../components';
import { FunctionComponent, useEffect } from 'react';

import { Button } from '../../../../../shared/shadcn/components/ui/button';
import { CallState } from '../../../../../../types/call';
import { Providers } from '../../../../../../fixtures/providers';
import VoiceOrb from '../../../../../shared/voice/orb/VoiceOrb';
import clsx from 'clsx';
import tinycolor from 'tinycolor2';
import { useConvoDemoDisabled } from '../../hooks/useConvoDemoDisabled';

interface RetellDemoProps {}

const retellBrandColor = '#ffffff';

const RetellDemo: FunctionComponent<RetellDemoProps> = () => {
  const onClick = useOnClick();

  const disabled = useConvoDemoDisabled({ providerId: Providers.Retell.id });

  const orbColor = tinycolor(retellBrandColor).setAlpha(0.2).toRgbString();
  const className = clsx({
    'relative w-full h-full': true
  });

  return (
    <div className={className}>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <VoiceOrb
          color={orbColor}
          sizePx={175}
          callState={CallState.Off}
          volume={0}
          // onClick={onClick}
          disabled={disabled}
        />
        {/* <Button className="mt-5" onClick={onClick}>
          click me
        </Button> */}
      </div>

      <div className={clsx({ 'opacity-50': disabled })}>
        <ConvoDemoLogoSymbol src={Providers.Retell.logo.localPath} />
        <ConvoDemoLinkToSiteBadge dest={Providers.Retell.links.documentation} label="docs" />
      </div>
    </div>
  );
};

const useOnClick = () => {
  return () => {
    alert('clicked');
  };
};

export default RetellDemo;
