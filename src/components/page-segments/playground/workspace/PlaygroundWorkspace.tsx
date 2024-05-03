import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import VapiCredentialCard from '../credentials/cards/lib/VapiCredentialCard';

const PlaygroundWorkspace: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-row h-full w-full items-center justify-center">
      <VapiCredentialCard />
    </div>
  );
};

export default PlaygroundWorkspace;
