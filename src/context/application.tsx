import React from 'react';
import { useDarkmodeEnabled } from '../design/darkmode';

interface IApplicationContext {
  // colors/theme related
  darkmodeEnabled: boolean;
  setDarkmodeEnabled: (_: boolean) => void;
}
export const ApplicationContext = React.createContext<IApplicationContext>({
  darkmodeEnabled: false,
  setDarkmodeEnabled: () => {}
});
export const ApplicationProvider = ({ children }: { children: any }) => {
  const { darkmodeEnabled, setDarkmodeEnabled } = useDarkmodeEnabled();

  const value = {
    darkmodeEnabled,
    setDarkmodeEnabled
  };

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};
