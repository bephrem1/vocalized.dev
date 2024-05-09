import React from 'react';
import { useIsUserSpeaking } from '../components/page-segments/playground/workspace/hooks/useIsUserSpeaking';

interface IUserSpeechRecognitionContext {
  isUserSpeaking: boolean;
  startSpeechRecognition: () => void;
}
export const UserSpeechRecognitionContext = React.createContext<IUserSpeechRecognitionContext>({
  isUserSpeaking: false,
  startSpeechRecognition: () => {}
});
export const UserSpeechRecognitionProvider = ({ children }) => {
  const { isUserSpeaking, startRecognition } = useIsUserSpeaking();

  const value = {
    isUserSpeaking,
    startSpeechRecognition: startRecognition
  };

  return (
    <UserSpeechRecognitionContext.Provider value={value}>
      {children}
    </UserSpeechRecognitionContext.Provider>
  );
};
