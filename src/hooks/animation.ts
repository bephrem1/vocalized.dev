import { useEffect, useState } from 'react';

export const useOpacity = ({
  start = 0,
  end = 1,
  fadeInDelayMs = 2000
}: {
  start?: number;
  end?: number;
  fadeInDelayMs?: number;
}) => {
  const [opacity, setOpacity] = useState(start);
  useEffect(() => {
    let frameId: any;

    const fade = () => {
      if (opacity < end) {
        setOpacity((prev: number) => Math.min(prev + 0.01, end)); // increment opacity

        frameId = requestAnimationFrame(fade); // continue the animation
      }
    };

    const startFade = () => {
      frameId = requestAnimationFrame(fade);
    };

    const timeoutId = setTimeout(startFade, fadeInDelayMs);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return opacity;
};
