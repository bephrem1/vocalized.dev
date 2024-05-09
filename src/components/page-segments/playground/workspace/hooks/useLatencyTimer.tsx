import { useRef } from 'react';

export const useLatencyTimer = () => {
  const startTime = useRef<number | null>(null);

  const startLatencyTimer = () => {
    startTime.current = Date.now();
  };
  const readAndResetLatencyTimer = () => {
    if (startTime.current !== null) {
      const endTime = Date.now();
      const elapsedMs = endTime - startTime.current;

      // reset the timer
      startTime.current = null;

      return elapsedMs;
    }

    return null;
  };

  return {
    startLatencyTimer,
    readAndResetLatencyTimer
  };
};
