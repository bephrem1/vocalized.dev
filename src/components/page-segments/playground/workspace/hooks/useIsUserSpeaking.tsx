import { useEffect, useRef, useState } from 'react';
import { useInterval, usePrevious } from '../../../../../hooks/utils';

import { randomInt } from '../../../../../helpers/numbers';

export enum UserTranscriberState {
  IDLE = 'idle',
  LISTENING = 'listening',
  ERROR = 'error'
}

enum TranscriberError {
  NO_SPEECH = 'no-speech',
  NOT_ALLOWED = 'not-allowed',
  ABORTED = 'aborted'
}

interface UseUserTranscriberReturn {
  isUserSpeaking: boolean;
  transcriberState: UserTranscriberState;
  transcriberErrored: boolean;
  startRecognition: () => void;
}

export const useIsUserSpeaking = (): UseUserTranscriberReturn => {
  const recognitionRef = useRef(null);
  const [transcriberState, setTranscriberState] = useState<UserTranscriberState>(
    UserTranscriberState.ERROR
  );
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);

  // handlers

  const onAudioStart = () => {
    setTranscriberState(UserTranscriberState.LISTENING);
  };

  const onAudioEnd = () => {
    setTranscriberState(UserTranscriberState.IDLE);

    setIsUserSpeaking(false);
  };

  const onSpeechResult = (event: any) => {
    if (
      transcriberState === UserTranscriberState.IDLE ||
      transcriberState === UserTranscriberState.ERROR
    ) {
      setTranscriberState(UserTranscriberState.LISTENING);
    }

    const isFinal = isSpeechResultFinal(event);
    if (isFinal) {
      setIsUserSpeaking(false); // mark as not speaking
    } else {
      setIsUserSpeaking(true); // if not final, user is speaking (partial result)
    }
  };

  const onError = (err: any) => {
    if (err.error === TranscriberError.NO_SPEECH) {
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch {}

        setTranscriberState(UserTranscriberState.LISTENING);
      }, 500);

      setIsUserSpeaking(false);
    } else if (
      err.error === TranscriberError.NOT_ALLOWED ||
      err.error === TranscriberError.ABORTED
    ) {
      setTranscriberState(UserTranscriberState.ERROR);
    } else {
      setTranscriberState(UserTranscriberState.ERROR);
    }
  };

  const onDisconnect = () => {
    if (recognitionRef.current) {
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch {}
        setTranscriberState(UserTranscriberState.LISTENING);
      }, randomInt({ min: 1000, max: 2000 }));
    }
  };

  // start / stop recognition

  const startRecognition = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = setupRecognition({
        onAudioStart,
        onAudioEnd,
        onSpeechResult,
        onError,
        onDisconnect
      });
    }

    if (transcriberState !== UserTranscriberState.LISTENING) {
      try {
        recognitionRef.current.start();
      } catch {}
      setTranscriberState(UserTranscriberState.LISTENING);
    }

    setIsUserSpeaking(false);
  };

  // rescue transcription if it gets stuck

  useInterval(() => {
    if (
      transcriberState === UserTranscriberState.IDLE ||
      transcriberState === UserTranscriberState.ERROR
    ) {
      startRecognition();
    }
  }, 10000);

  // update handlers - they close over state values

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = onSpeechResult;
      recognitionRef.current.onerror = onError;
      recognitionRef.current.onend = onDisconnect;
      recognitionRef.current.audiostart = onAudioStart;
      recognitionRef.current.audioend = onAudioEnd;
    }
  }, [onSpeechResult, onError, onDisconnect, onAudioStart, onAudioEnd]);

  return {
    isUserSpeaking,
    transcriberState,
    transcriberErrored: transcriberState === UserTranscriberState.ERROR,
    startRecognition
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

// helpers

const setupRecognition = ({ onAudioStart, onAudioEnd, onSpeechResult, onError, onDisconnect }) => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.continuous = true;

  recognition.audiostart = onAudioStart;
  recognition.audioend = onAudioEnd;
  recognition.onresult = onSpeechResult;
  recognition.onerror = onError;
  recognition.onend = onDisconnect;

  return recognition;
};

const isSpeechResultFinal = (event: any) => {
  if (!event.results || event.results.length === 0) {
    return false;
  }

  return event.results[event.results.length - 1].isFinal;
};

const browserSupportsTranscription = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};
