import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import PulsingOrb from '../../../shared/animated/PulsingOrb';

const PlaygroundTopBar: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-16 border-b border-b-stone-600 border-dashed">
      <div className="h-full w-24 flex items-center justify-center border-r border-r-stone-600 border-dashed">
        <PulsingOrb />
      </div>
    </div>
  );
};

export default PlaygroundTopBar;
