import UAParser, { IDevice, IOS } from 'ua-parser-js';
import { useEffect, useState } from 'react';

import { isEmpty } from '../../helpers/empty';

export enum ScreenSizes {
  xsmall = 'xsmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge',
  xxlarge = 'xxlarge',
  jumbo = 'jumbo'
}
export type ScreenSize = keyof typeof ScreenSizes;

const ScreenSizeCutoff = {
  // all in 'px'
  [ScreenSizes.xsmall]: 0, // < 576
  [ScreenSizes.small]: 576, // ≥ 576, < 768
  [ScreenSizes.medium]: 768, // ≥ 768, < 992
  [ScreenSizes.large]: 992, // ≥ 992, < 1200
  [ScreenSizes.xlarge]: 1200, // ≥ 1200, < 1400
  [ScreenSizes.xxlarge]: 1400, // ≥ 1400, < 1600
  [ScreenSizes.jumbo]: 1600 // ≥ 1600
};

const classifyScreenSize = ({ viewportWidth }: { viewportWidth: number }): ScreenSize => {
  if (viewportWidth < 0) {
    throw Error('Screen width cannot be less than 0');
  }

  const screenSizes: ScreenSize[] = Object.keys(ScreenSizeCutoff) as ScreenSize[];

  let cutoffLowerBound = 0;
  let cutoffUpperBound = 0;
  for (let index = 0; index < screenSizes.length; index++) {
    const onLastScreenSize: boolean = index === screenSizes.length - 1;

    const currentScreenSize: ScreenSize = screenSizes[index];
    const nextScreenSize: ScreenSize | null = onLastScreenSize ? null : screenSizes[index + 1];

    cutoffLowerBound = ScreenSizeCutoff[currentScreenSize];
    cutoffUpperBound = nextScreenSize ? ScreenSizeCutoff[nextScreenSize] : null;

    if (
      viewportWidth >= cutoffLowerBound &&
      (isEmpty(cutoffUpperBound) || viewportWidth < cutoffUpperBound)
    ) {
      return currentScreenSize;
    }
  }

  throw Error('Screen size could not be determined');
};

/*
  Screen-size compareTo():
    < 0: 'a' is smaller than 'b'
    = 0: 'a' is the same size as 'b'
    > 0: 'a' is larger than 'b'
*/
export const compareScreenSizes = (a: ScreenSize, b: ScreenSize) => {
  return rankScreenSize(a) - rankScreenSize(b);
};

const rankScreenSize = (screenSize: ScreenSize): number => {
  const screenSizesSequence: string[] = Object.keys(ScreenSizes);

  return screenSizesSequence.indexOf(screenSize);
};

const VIEWPORT_WIDTH_APPROXIMATION_PX = {
  MOBILE: 450,
  TABLET: 800,
  DESKTOP: 1600
};
export const estimateScreenWidthFromUserAgent = (userAgent: string): number => {
  if (!userAgent) {
    return VIEWPORT_WIDTH_APPROXIMATION_PX.DESKTOP;
  }

  const parser = new UAParser(userAgent);

  const os: IOS = parser.getOS();
  const device: IDevice = parser.getDevice();

  switch (device.type) {
    case 'console':
      return VIEWPORT_WIDTH_APPROXIMATION_PX.DESKTOP;
    case 'mobile':
      return VIEWPORT_WIDTH_APPROXIMATION_PX.MOBILE;
    case 'tablet':
      return VIEWPORT_WIDTH_APPROXIMATION_PX.TABLET;
  }

  switch (os.name) {
    case 'iOS':
    case 'Android':
    case 'Windows [Phone/Mobile]':
    case 'KaiOS':
    case 'BlackBerry':
      return VIEWPORT_WIDTH_APPROXIMATION_PX.MOBILE;
    case 'Mac OS':
    case 'Chromium OS':
    case 'Firefox OS':
    case 'Linux':
    case 'Debian':
    case 'Ubuntu':
    case 'Unix':
    case 'PCLinuxOS':
      return VIEWPORT_WIDTH_APPROXIMATION_PX.DESKTOP;
  }

  switch (device.vendor) {
    case 'BlackBerry':
    case 'Fairphone':
    case 'GeeksPhone':
      return VIEWPORT_WIDTH_APPROXIMATION_PX.MOBILE;
  }

  return VIEWPORT_WIDTH_APPROXIMATION_PX.DESKTOP;
};

export const useIsMobile = ({ userAgent }): boolean => {
  const screenSize: ScreenSize = useScreenSize({ userAgent });

  return compareScreenSizes(screenSize, ScreenSizes.small) <= 0;
};

export const useScreenSize = ({ userAgent }): ScreenSize => {
  const { width } = useViewportDimensions({ userAgent });
  const screenSize: ScreenSize = classifyScreenSize({ viewportWidth: width });

  return screenSize;
};

const useViewportDimensions = ({ userAgent }) => {
  const estimatedScreenWidth: number = estimateScreenWidthFromUserAgent(userAgent);

  const [viewportDimensions, set_viewportDimensions] = useState<{ width: number; height: number }>({
    width: estimatedScreenWidth,
    height: undefined
  });

  useEffect(() => {
    set_viewportDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      set_viewportDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewportDimensions;
};
