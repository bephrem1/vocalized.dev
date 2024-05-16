import React, { useContext, useEffect } from 'react';

import { PlaygroundContext } from './playground';
import { useIsUserSpeaking } from '../components/page-segments/playground/workspace/conversation/hooks/useIsUserSpeaking';

interface IUserSpeechRecognitionContext {
  isUserSpeaking: boolean;
  startSpeechRecognition: () => void;
  stopSpeechRecognition: () => void;
}
export const UserSpeechRecognitionContext = React.createContext<IUserSpeechRecognitionContext>({
  isUserSpeaking: false,
  startSpeechRecognition: () => {},
  stopSpeechRecognition: () => {}
});
export const UserSpeechRecognitionProvider = ({ children }) => {
  const { isUserSpeaking, startRecognition, stopRecognition } = useIsUserSpeaking();

  const { activeConvoProviderId } = useContext(PlaygroundContext);
  useEffect(() => {
    if (!activeConvoProviderId) {
      stopRecognition();
    }
  }, [activeConvoProviderId]);

  const value = {
    isUserSpeaking,
    startSpeechRecognition: startRecognition,
    stopSpeechRecognition: stopRecognition
  };

  return (
    <UserSpeechRecognitionContext.Provider value={value}>
      {children}
    </UserSpeechRecognitionContext.Provider>
  );
};
