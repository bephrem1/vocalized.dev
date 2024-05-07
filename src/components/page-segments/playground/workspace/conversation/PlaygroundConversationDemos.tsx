import BlandDemo from './providers/BlandDemo';
import { EmptyObject } from '../../../../../types/empty';
import { FunctionComponent } from 'react';
import RetellDemo from './providers/RetellDemo';
import VapiDemo from './providers/VapiDemo';
import VoiceOrb from '../../../../shared/voice/orb/VoiceOrb';

const PlaygroundConversationDemos: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-grow h-full">
      <div className="w-full grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 *:p-4">
        <div className="flex flex-row items-center justify-center border-dashed lg:border-r lg:border-r-stone-600 border-b border-b-stone-600">
          <VapiDemo />
        </div>
        <div className="border-dashed border-b border-b-stone-600">
          <RetellDemo />
        </div>
        <div className="border-dashed lg:border-r lg:border-r-stone-600 border-b border-b-stone-600 lg:border-b-0">
          <BlandDemo />
        </div>
        <div>
          <VoiceOrb color="#FFD1A5" sizePx={200} />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundConversationDemos;
