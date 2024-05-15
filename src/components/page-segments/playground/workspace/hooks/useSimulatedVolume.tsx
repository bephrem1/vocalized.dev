import { useEffect, useRef, useState } from 'react';

export const useSimulatedVolume = ({ assistantIsSpeaking }: { assistantIsSpeaking: boolean }) => {
  const [volume, setVolume] = useState(0);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (assistantIsSpeaking) {
      volumeIntervalRef.current = setInterval(() => {
        // generate volume mostly between 0.6 and 1, with occasional dips
        let randomVolume: number;
        if (Math.random() > 0.2) {
          // 80% chance to be between 0.6 and 1
          randomVolume = 0.6 + Math.random() * 0.4;
        } else {
          // 20% chance to be between 0 and 0.6
          randomVolume = Math.random() * 0.6;
        }

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
