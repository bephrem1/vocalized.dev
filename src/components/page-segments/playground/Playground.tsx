import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import PlaygroundTopBar from './top-bar/PlaygroundTopBar';

const Playground: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-screen flex-col justify-between content-between">
        <PlaygroundTopBar />
      </div>
    </div>
  );
};

export default Playground;
