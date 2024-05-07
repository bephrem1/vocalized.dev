import { FunctionComponent, useEffect, useRef, useState } from 'react';

import { CallState } from '../../../../types/call';
import VoiceOrbCircle from './components/VoiceOrbCircle';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  color?: string;
  sizePx?: number;
}

const VoiceOrb: FunctionComponent<Props> = ({ color = '#FFF', sizePx = 200 }) => {
  const [callState, setCallState] = useState<CallState>(CallState.Off);

  const speedRef = useRef(0.16);
  const intensityRef = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

  const volumeIntervalRef = useRef(null);
  const [volume, setVolume] = useState(0);
  useEffect(() => {
    if (callState === CallState.Connected) {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
      volumeIntervalRef.current = setInterval(() => {
        setVolume(Math.random());
      }, 200);
    }

    return () => {
      clearInterval(volumeIntervalRef.current);
    };
  }, [callState]);

  const startCall = () => {
    setCallState(CallState.Connecting);

    setTimeout(() => {
      setCallState(CallState.Connected);
    }, 2000);
  };
  const stopCall = () => {
    setCallState(CallState.Off);
  };

  const getOnClick = () => {
    switch (callState) {
      case 'off':
        return startCall;
      case 'connecting':
        return undefined;
      case 'connected':
        return stopCall;
    }
  };

  const circleWrapperClassName = clsx({
    relative: true,
    'cursor-pointer': callState !== CallState.Connecting
  });

  const animateFilter = getFilter({ volume, callState, isHovering });
  const animateTransition = getTransition({ callState });

  return (
    <div className="flex flex-col gap-4 justify-center items-center pt-16 pb-36 sm:py-0 h-full">
      <motion.div
        onClick={getOnClick()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={circleWrapperClassName}
        whileTap={{ filter: 'brightness(0.2)' }}
        animate={{ filter: animateFilter, transition: animateTransition }}
        style={{ width: sizePx, height: sizePx }}
      >
        <VoiceOrbCircle
          color={color}
          fadeInDelayMs={1500}
          fadeInDurationMs={1500}
          started={callState === CallState.Connected}
          speedRef={speedRef}
          intensityRef={intensityRef}
        />
      </motion.div>
    </div>
  );
};

const getFilter = ({ volume, callState, isHovering }) => {
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
