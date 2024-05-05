import { EmptyObject } from '../../../../../types/empty';
import { FunctionComponent } from 'react';

const PlaygroundConversationDemos: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-row h-full w-full">
      <div className="grid grid-cols-4 md:grid-cols-2 h-full w-full">
        <div className="bg-gray-200 p-4">Block 1</div>
        <div className="bg-gray-300 p-4">Block 2</div>
        <div className="bg-gray-400 p-4">Block 3</div>
        <div className="bg-gray-500 p-4">Block 4</div>
      </div>
    </div>
  );
};

export default PlaygroundConversationDemos;
