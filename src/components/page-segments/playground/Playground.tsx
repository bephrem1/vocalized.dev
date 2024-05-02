import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import PlaygroundFooter from './footer/PlaygroundFooter';
import PlaygroundTopBar from './top-bar/PlaygroundTopBar';

const Playground: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <PlaygroundTopBar />
        </div>
        <PlaygroundFooter />
      </div>
    </div>
  );
};

export default Playground;
