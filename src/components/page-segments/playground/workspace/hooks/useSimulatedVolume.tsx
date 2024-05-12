import { useEffect, useRef, useState } from 'react';

export const useSimulatedVolume = ({ assistantIsSpeaking }: { assistantIsSpeaking: boolean }) => {
  const [volume, setVolume] = useState(0);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (assistantIsSpeaking) {
      volumeIntervalRef.current = setInterval(() => {
        const randomVolume = Math.random(); // random volume between 0 and 1

        setVolume(randomVolume);
      }, 200);
    } else {
      setVolume(0); // reset volume when assistant stops speaking

      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
    }

    return () => {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
    };
  }, [assistantIsSpeaking]);

  return { volume };
};
