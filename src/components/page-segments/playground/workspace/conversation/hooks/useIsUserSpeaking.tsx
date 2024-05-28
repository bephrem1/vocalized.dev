import { useEffect } from 'react';
import { useMicVAD } from '@ricky0123/vad-react';
import { usePrevious } from '../../../../../../hooks/utils';

interface UseUserTranscriberReturn {
  isUserSpeaking: boolean;
  startRecognition: () => void;
  stopRecognition: () => void;
}

export const useIsUserSpeaking = (): UseUserTranscriberReturn => {
  const vad = useMicVAD({ startOnLoad: true });

  return {
    isUserSpeaking: vad.userSpeaking,
    startRecognition: vad.start,
    stopRecognition: vad.pause
  };
};

// auxiliary hooks

export const useUserSpeechHandlers = ({
  isUserSpeaking,
  onUserSpeechStart,
  onUserSpeechEnd
}: {
  isUserSpeaking: boolean;
  onUserSpeechStart?: () => void;
  onUserSpeechEnd?: () => void;
}) => {
  const isUserSpeakingPrev = usePrevious(isUserSpeaking);
  useEffect(() => {
    const userSpeechStarted = isUserSpeaking && !isUserSpeakingPrev;

    if (userSpeechStarted && onUserSpeechStart) {
      onUserSpeechStart();
    }

    if (!isUserSpeaking && isUserSpeakingPrev && onUserSpeechEnd) {
      onUserSpeechEnd();
    }
  }, [isUserSpeaking]);
};
