import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import PlaygroundConfigs from './components/PlaygroundConfigs';
import PlaygroundConversationDemos from './conversation/PlaygroundConversationDemos';

const PlaygroundWorkspace: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-col sm:flex-row h-full w-full">
      <PlaygroundConfigs />
      <PlaygroundConversationDemos />
    </div>
  );
};

export default PlaygroundWorkspace;
