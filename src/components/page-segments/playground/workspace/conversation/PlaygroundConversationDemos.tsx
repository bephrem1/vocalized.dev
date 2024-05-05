import { EmptyObject } from '../../../../../types/empty';
import { FunctionComponent } from 'react';

const PlaygroundConversationDemos: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-grow h-full">
      <div className="w-full grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2">
        <div className="p-4 border-dashed border-r border-r-stone-600 border-b border-b-stone-600">
          Block 1
        </div>
        <div className="p-4">Block 2</div>
        <div className="p-4">Block 3</div>
        <div className="p-4">Block 4</div>
      </div>
    </div>
  );
};

export default PlaygroundConversationDemos;
