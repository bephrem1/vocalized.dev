import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useInterval = (
  cb: (intervalId?: NodeJS.Timeout) => void,
  delayMs: number,
  extraDeps: Array<any> = []
) => {
  const savedCallback = useRef<any>();
  const timerId = useRef(undefined);

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current(timerId.current);
      }
    };

    timerId.current = setInterval(tick, delayMs);

    return () => clearInterval(timerId.current);
  }, [delayMs, ...extraDeps]);
};
