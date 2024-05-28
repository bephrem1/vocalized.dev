import { useEffect, useState } from 'react';

export const useOpacity = ({
  start = 0,
  end = 1,
  fadeInDelayMs = 0,
  durationMs = 1500,
  begin = true
}: {
  start?: number;
  end?: number;
  fadeInDelayMs?: number;
  durationMs?: number;
  begin?: boolean;
}) => {
  const [opacity, setOpacity] = useState(start);
  const increment = (end - start) / (durationMs / 10); // calculate increment per 10ms

  useEffect(() => {
    let frameId: any;

    const fade = () => {
      if (opacity < end) {
        setOpacity((prev: number) => Math.min(prev + increment, end));

        frameId = requestAnimationFrame(fade); // continue the animation
      }
    };

    const startFade = () => {
      frameId = requestAnimationFrame(fade);
    };

    let timeoutId: NodeJS.Timeout;

    if (begin) {
      // only start the fade when trigger is true
      timeoutId = setTimeout(startFade, fadeInDelayMs);
    }

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [begin, increment]);

  if (durationMs === 0 || start === end) {
    return end;
  }

  return opacity;
};
