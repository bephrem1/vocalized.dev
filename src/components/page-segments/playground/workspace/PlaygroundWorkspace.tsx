import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';

const PlaygroundWorkspace: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-row h-full w-full items-center justify-center">
      <div className="w-4 h-4 bg-white" />
    </div>
  );
};

export default PlaygroundWorkspace;
