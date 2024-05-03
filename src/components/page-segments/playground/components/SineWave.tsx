import React, { FunctionComponent, useEffect, useRef } from 'react';

import { randomInt } from '../../../../helpers/numbers';

interface SineWaveProps {
  heightPx: number;
}

const SineWave: FunctionComponent<SineWaveProps> = ({ heightPx }) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const timeoutIdRef = useRef(null);

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

    // set the stroke-dasharray and stroke-dashoffset for animation
    const pathLength = path.getTotalLength();

    // initially hide the wave
    path.style.strokeDasharray = `0, ${pathLength}`;
    path.style.strokeDashoffset = '0';

    const animateWave = () => {
      const visibleLength = randomInt({ min: 200, max: 300 });

      // set the strokeDasharray to make the wave visible
      path.style.strokeDasharray = `${visibleLength}, ${pathLength}`;
      path.style.strokeDashoffset = pathLength;

      const animation = path.animate(
        [{ strokeDashoffset: pathLength }, { strokeDashoffset: -pathLength }],
        {
          duration: 10000, // control speed
          fill: 'forwards'
        }
      );

      animation.finished.then(() => {
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(animateWave, randomInt({ min: 15000, max: 30000 }));
      });
    };

    // start animation after delay
    timeoutIdRef.current = setTimeout(animateWave, randomInt({ min: 10000, max: 20000 }));

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
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
