import React, { useState } from 'react';

interface IPlaygroundContext {
  providerKeyDrawerOpen: boolean;
  togglePlaygroundDrawer: () => void;
}
export const PlaygroundContext = React.createContext<IPlaygroundContext>({
  providerKeyDrawerOpen: false,
  togglePlaygroundDrawer: () => {}
});
export const PlaygroundProvider = ({ children }) => {
  const [providerKeyDrawerOpen, setProviderKeyDrawerOpen] = useState(false);

  const value = {
    providerKeyDrawerOpen,
    togglePlaygroundDrawer: () => setProviderKeyDrawerOpen(!providerKeyDrawerOpen)
  };

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
};
