import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import PlaygroundTopBar from './top-bar/PlaygroundTopBar';

const Playground: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen">
      <PlaygroundTopBar />
    </div>
  );
};

export default Playground;
