import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import PlaygroundFooter from './footer/PlaygroundFooter';
import PlaygroundTopBar from './top-bar/PlaygroundTopBar';
import PlaygroundWorkspace from './workspace/PlaygroundWorkspace';

const Playground: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col">
        <PlaygroundTopBar />
        <div className="w-full flex-grow overflow-auto">
          <PlaygroundWorkspace />
        </div>
        <PlaygroundFooter />
      </div>
    </div>
  );
};

export default Playground;
