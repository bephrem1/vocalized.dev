import React, { useState } from 'react';

import { PlaygroundMode } from '../components/page-segments/playground/playground-modes';

interface IPlaygroundContext {
  playgroundMode: PlaygroundMode;
  setPlaygroundMode: (mode: PlaygroundMode) => void;

  providerKeyDrawerOpen: boolean;
  togglePlaygroundDrawer: () => void;
}
export const PlaygroundContext = React.createContext<IPlaygroundContext>({
  playgroundMode: PlaygroundMode.Conversation,
  setPlaygroundMode: () => {},

  providerKeyDrawerOpen: false,
  togglePlaygroundDrawer: () => {}
});
export const PlaygroundProvider = ({ children }) => {
  const [playgroundMode, setPlaygroundMode] = useState(PlaygroundMode.Conversation);
  const [providerKeyDrawerOpen, setProviderKeyDrawerOpen] = useState(false);

  const value = {
    playgroundMode,
    setPlaygroundMode,

    providerKeyDrawerOpen,
    togglePlaygroundDrawer: () => setProviderKeyDrawerOpen(!providerKeyDrawerOpen)
  };

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
};
