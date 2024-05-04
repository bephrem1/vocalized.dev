import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import VapiCredentialsCard from '../credentials/cards/lib/VapiCredentialsCard';

const PlaygroundWorkspace: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-row h-full w-full items-center justify-center">
      <VapiCredentialsCard />
    </div>
  );
};

export default PlaygroundWorkspace;
