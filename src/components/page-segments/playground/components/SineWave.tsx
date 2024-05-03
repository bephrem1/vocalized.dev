import React, { FunctionComponent, useEffect, useRef } from 'react';

import { randomInt } from '../../../../helpers/numbers';

interface SineWaveProps {
  heightPx: number;
}

const SineWave: FunctionComponent<SineWaveProps> = ({ heightPx }) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const amplitude = heightPx / 2; // half for the full height of the wave
    const frequency = (2 * Math.PI) / 50; // one full cycle every 50px
    const points = width / 2; // number of points to calculate along the width of the SVG
    const step = width / points;

    let d = 'M 0 ' + height / 2;
    for (let i = 0; i <= points; i++) {
      let x = i * step;
      let y = height / 2 + amplitude * Math.sin(i * frequency);
      d += ` L ${x} ${y}`;
    }
    path.setAttribute('d', d);

    // Set the stroke-dasharray and stroke-dashoffset for animation
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength;

    const animateWave = () => {
      const animation = path.animate(
        [{ strokeDashoffset: pathLength }, { strokeDashoffset: -pathLength }],
        {
          duration: randomInt({ min: 4000, max: 7000 }),
          fill: 'forwards'
        }
      );

      // restart the animation after it finishes, after a random delay
      animation.finished.then(() => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId); // Clear any existing timeout to avoid overlaps
        }

        timeoutId = setTimeout(animateWave, randomInt({ min: 5000, max: 15000 }));
      });
    };

    animateWave(); // Start the animation loop
  }, [heightPx]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${heightPx + 2}px`,
        overflow: 'hidden'
      }}
    >
      <svg
        ref={svgRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <path
          ref={pathRef}
          className="stroke-stone-800"
          fill="none"
          stroke="blue"
          strokeWidth="2"
        ></path>
      </svg>
    </div>
  );
};

export default SineWave;
