import { FIRST_MESSAGE_DEFAULT, SYSTEM_PROMPT_DEFAULT } from '../fixtures/prompts';
import React, { useState } from 'react';

import { PlaygroundMode } from '../components/page-segments/playground/playground-modes';
import { SESSION_STORAGE_KEYS } from '../persistence';
import { isEmpty } from '../helpers/empty';
import { usePersistedValue } from '../hooks/persistence';

interface IPlaygroundContext {
  playgroundMode: PlaygroundMode;
  setPlaygroundMode: (mode: PlaygroundMode) => void;

  credentialsDrawerOpen: boolean;
  toggleCredentialsDrawer: (open?: boolean) => void;

  systemPrompt?: string;
  setSystemPrompt: (prompt: string) => void;
  firstMessage?: string;
  setFirstMessage?: (message: string) => void;
}
export const PlaygroundContext = React.createContext<IPlaygroundContext>({
  playgroundMode: PlaygroundMode.Conversation,
  setPlaygroundMode: () => {},

  credentialsDrawerOpen: false,
  toggleCredentialsDrawer: () => {},

  systemPrompt: SYSTEM_PROMPT_DEFAULT,
  setSystemPrompt: () => {},
  firstMessage: '',
  setFirstMessage: () => {}
});
export const PlaygroundProvider = ({ children }) => {
  const { value: playgroundMode, setValue: setPlaygroundMode } = usePersistedValue<PlaygroundMode>({
    defaultValue: PlaygroundMode.Conversation,
    persistenceKey: SESSION_STORAGE_KEYS.PLAYGROUND.MODE,
    useSessionStorage: true
  });
  const { value: credentialsDrawerOpen, setValue: setCredentialsDrawerOpen } =
    usePersistedValue<boolean>({
      defaultValue: false,
      persistenceKey: SESSION_STORAGE_KEYS.PLAYGROUND.CREDENTIALS_DRAWER_OPEN,
      useSessionStorage: true
    });

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

  const toggleCredentialsDrawer = (open?: boolean) => {
    if (!isEmpty(open)) {
      setCredentialsDrawerOpen(open);
    } else {
      setCredentialsDrawerOpen(!credentialsDrawerOpen);
    }
  };

  const value = {
    playgroundMode,
    setPlaygroundMode,

    credentialsDrawerOpen,
    toggleCredentialsDrawer,

    systemPrompt,
    setSystemPrompt,
    firstMessage,
    setFirstMessage
  };

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
};
