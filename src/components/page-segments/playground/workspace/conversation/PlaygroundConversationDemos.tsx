import ConversationOrb from '../../../../shared/voice/ConversationOrb';
import { EmptyObject } from '../../../../../types/empty';
import { FunctionComponent } from 'react';

const PlaygroundConversationDemos: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-grow h-full">
      <div className="w-full grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 *:p-4">
        <div className="flex flex-row items-center justify-center border-dashed lg:border-r lg:border-r-stone-600 border-b border-b-stone-600">
          <ConversationOrb />
        </div>
        <div className="border-dashed border-b border-b-stone-600"></div>
        <div className="border-dashed lg:border-r lg:border-r-stone-600 border-b border-b-stone-600 lg:border-b-0"></div>
        <div></div>
      </div>
    </div>
  );
};

export default PlaygroundConversationDemos;
