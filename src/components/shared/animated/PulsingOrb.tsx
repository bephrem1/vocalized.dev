import styled, { keyframes } from 'styled-components';

import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

interface PulsingRingProps {
  $size: number;
  $duration: number;
  $delay?: number;
}
const PulsingRing = styled.div<PulsingRingProps>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: white;
  border-radius: 50%;
  animation: ${ping} ${({ $duration }) => $duration}s cubic-bezier(0, 0, 0.2, 1) infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
`;

const PulsingOrb: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-4 h-4 bg-white rounded-full" />
      <PulsingRing $size={16} $duration={3} />
      <PulsingRing $size={20} $duration={3} $delay={1} />
    </div>
  );
};

export default PulsingOrb;
