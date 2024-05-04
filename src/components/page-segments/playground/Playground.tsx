import ClearVapiCredentialsModal from '../../shared/modal/lib/credentials/lib/ClearVapiCredentialsModal';
import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import PlaygroundFooter from './footer/PlaygroundFooter';
import PlaygroundTopBar from './top-bar/PlaygroundTopBar';
import PlaygroundWorkspace from './workspace/PlaygroundWorkspace';
import SetVapiCredentialsModal from '../../shared/modal/lib/credentials/lib/SetVapiCredentialsModal';

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

      <PlaygroundModals />
    </div>
  );
};

const PlaygroundModals = () => {
  return (
    <>
      <SetVapiCredentialsModal />

      <ClearVapiCredentialsModal />
    </>
  );
};

export default Playground;
