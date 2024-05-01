import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import PulsingOrb from '../../shared/animated/PulsingOrb';

const Playground: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <PulsingOrb />
      </div>
    </div>
  );
};

export default Playground;
