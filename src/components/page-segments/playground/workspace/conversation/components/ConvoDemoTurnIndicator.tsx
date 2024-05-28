import { FunctionComponent, useContext, useEffect } from 'react';

import InfoTooltip from '../../../../../shared/tooltip/InfoTooltip';
import { Projects } from '../../../../../../fixtures/projects';
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
}) => {
  const { isUserSpeaking, startSpeechRecognition } = useContext(UserSpeechRecognitionContext);
  useEffect(() => {
    startSpeechRecognition();
  }, []);

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
      'bg-fuchsia-950 bg-opacity-75 hover:bg-opacity-50 border border-solid border-fuchsia-900':
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
      <div className="flex flex-row items-center mb-2.5">
        <p className="text-neutral-300 text-sm mr-1.5">Speaking</p>
        <InfoTooltip
          text="An indicator showing who is speaking. Only works while wearing headphones. If inactive, try refreshing or opening playground in a new tab."
          sizePx={11}
          infoIconColor="text-neutral-300"
        />
      </div>
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
    case Projects.Vapi.id:
      return 'bg-emerald-700 bg-opacity-75 hover:bg-opacity-50 border border-solid border-emerald-600';
    case Projects.Retell.id:
      return 'bg-neutral-700 bg-opacity-75 hover:bg-opacity-50 border border-solid border-neutral-600';
    case Projects.Bland.id:
      return 'bg-violet-900 bg-opacity-75 hover:bg-opacity-50 border border-solid border-violet-800';
    case Projects.Hume.id:
      return 'bg-orange-900 bg-opacity-75 hover:bg-opacity-50 border border-solid border-orange-800';
    default:
      throw Error(`please set a badge coloring for providerId: ${providerId}`);
  }
};
