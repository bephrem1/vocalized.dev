import { BaseIconProps, IconAccessibilityTitle, getBaseSvgProps } from '../..';

import { FunctionComponent } from 'react';
import clsx from 'clsx';

const iconName = 'x-corp-logo';

const XLogo: FunctionComponent<BaseIconProps> = ({ className, stroke, strokeWidth, alt }) => {
  const svgBaseOptions = getBaseSvgProps({ iconName });

  return (
    <svg
      className={className}
      viewBox="280 0 200 205"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      {...svgBaseOptions}
    >
      <IconAccessibilityTitle iconName={iconName} alt={alt} />
      <path
        className={clsx(stroke, strokeWidth)}
        d="M 401.36999,86.574354 477.17002,0.28595244 H 459.21028 L 393.36353,75.193557 340.81026,0.28595244 h -60.628 L 359.67069,113.5693 l -79.48843,90.479 h 17.95972 l 69.49342,-79.12332 55.51114,79.12332 h 60.628 z m -24.60647,27.989356 -8.06611,-11.28755 -64.07882,-89.730463 h 27.58984 l 51.72879,72.442789 8.03218,11.287548 67.2322,94.159266 h -27.58984 z"
        id="path1-7"
      />
    </svg>
  );
};

export default XLogo;
