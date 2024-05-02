import { ScreenSize, useIsMobile, useScreenSize } from '../design/core/responsive';

import React from 'react';
import { useDarkmodeEnabled } from '../design/darkmode';

interface IApplicationContext {
  // mobile-responsiveness related
  isMobile: boolean;
  screenSize: ScreenSize;

  // colors/theme related
  darkmodeEnabled: boolean;
  setDarkmodeEnabled: (_: boolean) => void;
}
export const ApplicationContext = React.createContext<IApplicationContext>({
  isMobile: undefined,
  screenSize: undefined,

  darkmodeEnabled: false,
  setDarkmodeEnabled: () => {}
});
export const ApplicationProvider = ({
  userAgent,
  children
}: {
  userAgent: string;
  children: any;
}) => {
  const isMobile = useIsMobile({ userAgent });
  const screenSize = useScreenSize({ userAgent });

  const { darkmodeEnabled, setDarkmodeEnabled } = useDarkmodeEnabled();

  const value = {
    isMobile,
    screenSize,
    darkmodeEnabled,
    setDarkmodeEnabled
  };

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};
