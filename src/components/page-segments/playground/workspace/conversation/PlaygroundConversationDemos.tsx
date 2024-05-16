import { FunctionComponent, useContext, useState } from 'react';

import BlandDemo from './providers/bland/BlandDemo';
import { EmptyObject } from '../../../../../types/empty';
import HumeDemo from './providers/hume/HumeDemo';
import { PlaygroundContext } from '../../../../../context/playground';
import { ProviderId } from '../../../../../fixtures/providers';
import RetellDemo from './providers/retell/RetellDemo';
import { UserSpeechRecognitionProvider } from '../../../../../context/user-speech-recognition';
import VapiDemo from './providers/vapi/VapiDemo';

const PlaygroundConversationDemos: FunctionComponent<EmptyObject> = () => {
  const { visibleConvoDemoProviderIds } = useContext(PlaygroundContext);

  const first = visibleConvoDemoProviderIds[0];
  const second = visibleConvoDemoProviderIds[1];
  const third = visibleConvoDemoProviderIds[2];
  const fourth = visibleConvoDemoProviderIds[3];

  return (
    <UserSpeechRecognitionProvider>
      <div className="flex flex-grow h-full">
        <div className="w-full grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2">
          <div className="flex flex-row items-center justify-center border-dashed lg:border-r lg:border-r-stone-600 border-b border-b-stone-600">
            <ConversationDemo providerId={first} index={0} />
          </div>
          <div className="border-dashed border-b border-b-stone-600">
            <ConversationDemo providerId={second} index={1} />
          </div>
          <div className="border-dashed lg:border-r lg:border-r-stone-600 border-b border-b-stone-600 lg:border-b-0">
            <ConversationDemo providerId={third} index={2} />
          </div>
          <div>
            <ConversationDemo providerId={fourth} index={3} />
          </div>
        </div>
      </div>
    </UserSpeechRecognitionProvider>
  );
};

const ConversationDemo = ({ providerId, index }: { providerId: ProviderId; index: number }) => {
  switch (providerId) {
    case ProviderId.Vapi:
      return <VapiDemo index={index} />;
    case ProviderId.Retell:
      return <RetellDemo index={index} />;
    case ProviderId.Bland:
      return <BlandDemo index={index} />;
    case ProviderId.Hume:
      return <HumeDemo index={index} />;
    default:
      return null;
  }
};

export default PlaygroundConversationDemos;
