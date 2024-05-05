import { FIRST_MESSAGE_DEFAULT, SYSTEM_PROMPT_DEFAULT } from '../fixtures/prompts';
import React, { useState } from 'react';

import { PlaygroundMode } from '../components/page-segments/playground/playground-modes';
import { SESSION_STORAGE_KEYS } from '../persistence';
import { usePersistedValue } from '../hooks/persistence';

interface IPlaygroundContext {
  playgroundMode: PlaygroundMode;
  setPlaygroundMode: (mode: PlaygroundMode) => void;

  providerKeyDrawerOpen: boolean;
  togglePlaygroundDrawer: () => void;

  systemPrompt?: string;
  setSystemPrompt: (prompt: string) => void;
  firstMessage?: string;
  setFirstMessage?: (message: string) => void;
}
export const PlaygroundContext = React.createContext<IPlaygroundContext>({
  playgroundMode: PlaygroundMode.Conversation,
  setPlaygroundMode: () => {},

  providerKeyDrawerOpen: false,
  togglePlaygroundDrawer: () => {},

  systemPrompt: SYSTEM_PROMPT_DEFAULT,
  setSystemPrompt: () => {},
  firstMessage: '',
  setFirstMessage: () => {}
});
export const PlaygroundProvider = ({ children }) => {
  const [playgroundMode, setPlaygroundMode] = useState(PlaygroundMode.Conversation);
  const [providerKeyDrawerOpen, setProviderKeyDrawerOpen] = useState(false);

  const { value: systemPrompt, setValue: setSystemPrompt } = usePersistedValue<string>({
    defaultValue: SYSTEM_PROMPT_DEFAULT,
    persistenceKey: SESSION_STORAGE_KEYS.PLAYGROUND.SYSTEM_PROMPT,
    useSessionStorage: true
  });
  const { value: firstMessage, setValue: setFirstMessage } = usePersistedValue<string>({
    defaultValue: FIRST_MESSAGE_DEFAULT,
    persistenceKey: SESSION_STORAGE_KEYS.PLAYGROUND.FIRST_MESSAGE,
    useSessionStorage: true
  });

  const value = {
    playgroundMode,
    setPlaygroundMode,

    providerKeyDrawerOpen,
    togglePlaygroundDrawer: () => setProviderKeyDrawerOpen(!providerKeyDrawerOpen),

    systemPrompt,
    setSystemPrompt,
    firstMessage,
    setFirstMessage
  };

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
};
