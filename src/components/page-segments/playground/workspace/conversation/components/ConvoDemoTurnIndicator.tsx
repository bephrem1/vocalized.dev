import { FunctionComponent, useContext } from 'react';

import { Providers } from '../../../../../../fixtures/providers';
import { UserSpeechRecognitionContext } from '../../../../../../context/user-speech-recognition';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ConvoDemoTurnIndicatorProps {
  assistantIsSpeaking: boolean;
  providerId: string;
}

export const ConvoDemoTurnIndicator: FunctionComponent<ConvoDemoTurnIndicatorProps> = ({
  assistantIsSpeaking,
  providerId
}: ConvoDemoTurnIndicatorProps) => {
  const { isUserSpeaking } = useContext(UserSpeechRecognitionContext);

  const badgeShared = clsx({
    'w-fit h-fit px-4 py-1': true,
    'rounded-full': true,
    'select-none': true
  });
  const userBadgeClassName = twMerge(
    badgeShared,
    clsx({
      'mr-2': true,
      'bg-neutral-900 border border-solid border-neutral-800': !isUserSpeaking,
      'bg-emerald-700 bg-opacity-75 hover:bg-opacity-50 border border-solid border-emerald-600':
        isUserSpeaking
    })
  );
  const assistantBadgeClassName = twMerge(
    badgeShared,
    clsx({
      'bg-neutral-900 border border-solid border-neutral-800': !assistantIsSpeaking,
      [getAssistantActiveColoring({ providerId })]: assistantIsSpeaking
    })
  );

  return (
    <div>
      <p className="text-neutral-300 text-sm mb-2.5">Speaking</p>
      <div className="flex flex-row items-center">
        <div className={userBadgeClassName}>
          <p className="text-neutral-300 text-xs">user</p>
        </div>
        <div className={assistantBadgeClassName}>
          <p className="text-neutral-300 text-xs">assistant</p>
        </div>
      </div>
    </div>
  );
};

const getAssistantActiveColoring = ({ providerId }) => {
  switch (providerId) {
    case Providers.Vapi.id:
      return 'bg-emerald-700 bg-opacity-75 hover:bg-opacity-50 border border-solid border-emerald-600';
    default:
      throw Error(`please set a badge coloring for providerId: ${providerId}`);
  }
};
