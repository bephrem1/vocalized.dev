import { faArrowUpRightFromSquare, faPlay } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../../../../shared/shadcn/components/ui/button';
import { CallState } from '../../../../../../types/call';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../../../../../shared/elements/Link';
import { useOpacity } from '../../../../../../hooks/animation';

export const ConvoDemoLinkToSiteBadge = ({ dest }: { dest: string }) => {
  return (
    <div className="absolute left-1 bottom-2 opacity-80">
      <Link type="external" dest={dest} fillContainer={false} openInNewWindow>
        <div className="w-full h-full flex flex-row items-center justify-center px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
          <p className="text-neutral-500 text-xs mr-1.5">docs</p>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-neutral-500"
            style={{ width: '12px', height: '12px' }}
          />
        </div>
      </Link>
    </div>
  );
};

export const ConvoDemoLogoSymbol = ({ src }) => {
  return (
    <div className="absolute bottom-2 right-2 hover:opacity-80 transition-all duration-300">
      <img src={src} className="w-10 h-10 rounded-sm" draggable={false} />
    </div>
  );
};

export const ConvoDemoControlButton = ({
  callState,
  disabled,
  onClick
}: {
  callState: CallState;
  disabled: boolean;
  onClick?: () => void;
}) => {
  const buttonDisabled = callState === CallState.Connecting || disabled;
  const opacity = useOpacity({ start: 0, end: 1 });

  return (
    <div className="absolute bottom-8 w-full flex justify-center items-center">
      <Button
        className="bg-neutral-900 hover:bg-neutral-800 border-solid border-neutral-700 px-6 py-4 rounded-full active:opacity-80"
        disabled={buttonDisabled}
        onClick={onClick}
        style={{ opacity }}
      >
        <FontAwesomeIcon
          icon={faPlay}
          className="text-white mr-1.5"
          style={{ width: '10px', height: '10px' }}
        />
        Start
      </Button>
    </div>
  );
};
