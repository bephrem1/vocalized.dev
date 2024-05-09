import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../../../../shared/shadcn/components/ui/button';
import { CallState } from '../../../../../../types/call';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { useOpacity } from '../../../../../../hooks/animation';

interface ConvoDemoControlButtonProps {
  callState: CallState;
  disabled: boolean;
  onClick?: () => void;
}

export const ConvoDemoControlButton: FunctionComponent<ConvoDemoControlButtonProps> = ({
  callState,
  disabled,
  onClick
}: ConvoDemoControlButtonProps) => {
  const buttonDisabled = callState === CallState.Connecting || disabled;

  const animatedOpacity = useOpacity({ start: 0, end: 1 });
  const opacity = callState === CallState.Connecting ? 0.65 : animatedOpacity;

  const getLabel = () => {
    switch (callState) {
      case CallState.Connecting:
        return (
          <span>
            Connecting
            <span className="inline-block">
              <span className="animate-ellipsis-dot-1">.</span>
              <span className="animate-ellipsis-dot-2">.</span>
              <span className="animate-ellipsis-dot-3">.</span>
            </span>
          </span>
        );
      case CallState.Connected:
        return 'Stop Call';
      case CallState.Off:
        return 'Start';
    }
  };
  const getFaIcon = () => {
    switch (callState) {
      case CallState.Off:
        return faPlay;
      case CallState.Connecting:
        return null;
      case CallState.Connected:
        return faStop;
      default:
        return null;
    }
  };

  const label = getLabel();
  const faIcon = getFaIcon();

  return (
    <div className="absolute bottom-12 w-full flex justify-center items-center">
      <Button
        className="bg-neutral-900 hover:bg-neutral-800 border-solid border-neutral-700 px-6 py-4 rounded-full active:opacity-80"
        disabled={buttonDisabled}
        onClick={onClick}
        style={{ opacity }}
      >
        {faIcon ? (
          <FontAwesomeIcon
            icon={faIcon}
            className="text-white mr-1.5"
            style={{ width: '10px', height: '10px' }}
          />
        ) : null}
        {label}
      </Button>
    </div>
  );
};
