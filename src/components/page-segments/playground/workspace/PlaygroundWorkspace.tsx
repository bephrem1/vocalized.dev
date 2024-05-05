import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import VapiCredentialsCard from '../credentials/cards/lib/VapiCredentialsCard';

const PlaygroundWorkspace: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-row h-full w-full">
      <div className="w-[507px] h-full border-r border-r-stone-600 border-dashed"></div>
    </div>
  );
};

export default PlaygroundWorkspace;
