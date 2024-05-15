import { useEffect } from 'react';
import { useMicVAD } from '@ricky0123/vad-react';
import { usePrevious } from '../../../../../hooks/utils';

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
  console.log('isUserSpeakingPrev ------------', isUserSpeakingPrev);
  console.log('isUserSpeaking --------------------------', isUserSpeaking);
  useEffect(() => {
    const userSpeechStarted = isUserSpeaking && !isUserSpeakingPrev;
    console.log(userSpeechStarted);

    if (userSpeechStarted && onUserSpeechStart) {
      onUserSpeechStart();
      console.log('on speech start');
    }

    if (!isUserSpeaking && isUserSpeakingPrev && onUserSpeechEnd) {
      onUserSpeechEnd();
      console.log('on speech end');
    }
  }, [isUserSpeaking]);
};
