import { useRef } from 'react';

export const useLatencyTimer = () => {
  const startTime = useRef<number | null>(null);

  const startLatencyTimer = () => {
    startTime.current = Date.now();
  };
  const resetLatencyTimer = () => {
    startTime.current = null;
  };
  const readAndResetLatencyTimer = () => {
    if (startTime.current !== null) {
      const endTime = Date.now();
      const elapsedMs = endTime - startTime.current;

      resetLatencyTimer();

      return elapsedMs;
    }

    return null;
  };

  return {
    startLatencyTimer,
    readAndResetLatencyTimer,
    resetLatencyTimer
  };
};
