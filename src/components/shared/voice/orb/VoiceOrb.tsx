import { FunctionComponent, useState } from 'react';

import { CallState } from '../../../../types/call';
import VoiceOrbCircle from './components/VoiceOrbCircle';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  color?: string;
  sizePx?: number;
  callState: CallState;
  volume?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const VoiceOrb: FunctionComponent<Props> = ({
  color = '#FFF',
  sizePx = 200,
  callState = CallState.Off,
  volume = 0,
  onClick,
  disabled = false
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const animateFilter = getFilter({ volume, callState, isHovering, disabled });
  const animateTransition = getTransition({ callState });

  const circleWrapperClassName = clsx({
    relative: true,
    'cursor-pointer': callState !== CallState.Connecting && !disabled,
    'pointer-events-none': disabled
  });

  return (
    <div className="flex flex-col w-fit h-fit">
      <motion.div
        onClick={!disabled ? onClick : undefined}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={circleWrapperClassName}
        whileTap={{ filter: 'brightness(0.2)' }}
        animate={{ filter: animateFilter, transition: animateTransition }}
        style={{ width: sizePx, height: sizePx }}
      >
        <VoiceOrbCircle
          color={color}
          fadeInDelayMs={500}
          fadeInDurationMs={1250}
          animateTextureMesh={callState === CallState.Connected}
        />
      </motion.div>
    </div>
  );
};

const getFilter = ({ volume, callState, isHovering, disabled }) => {
  if (disabled) {
    return `brightness(0.2)`;
  }

  if (callState === CallState.Connecting) {
    return [`brightness(0.2)`, `brightness(0.5)`];
  }

  const base = 0.8;
  const increment = volume * 0.2;
  const hoverIncrement = callState === CallState.Off && isHovering ? 0.2 : 0;

  return `brightness(${base + increment + hoverIncrement})`;
};

const getTransition = ({ callState }): any => {
  if (callState === CallState.Connecting) {
    return {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse'
    };
  }

  return {
    duration: 0.2
  };
};

export default VoiceOrb;
