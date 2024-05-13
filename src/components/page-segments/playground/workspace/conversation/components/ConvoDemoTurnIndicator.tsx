import { FunctionComponent, useContext } from 'react';

import InfoTooltip from '../../../../../shared/tooltip/InfoTooltip';
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
          text="An indicator showing who is speaking. If not working or slow, try refreshing or switching to a different browser (like Chrome). Works best while wearing headphones."
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
    case Providers.Vapi.id:
      return 'bg-emerald-700 bg-opacity-75 hover:bg-opacity-50 border border-solid border-emerald-600';
    case Providers.Retell.id:
      return 'bg-neutral-700 bg-opacity-75 hover:bg-opacity-50 border border-solid border-neutral-600';
    case Providers.Bland.id:
      return 'bg-violet-800 bg-opacity-75 hover:bg-opacity-50 border border-solid border-violet-700';
    default:
      throw Error(`please set a badge coloring for providerId: ${providerId}`);
  }
};
