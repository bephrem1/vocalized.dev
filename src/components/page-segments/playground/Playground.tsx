import ClearBlandCredentialsModal from '../../shared/modal/lib/credentials/lib/ClearBlandCredentialsModal';
import ClearRetellCredentialsModal from '../../shared/modal/lib/credentials/lib/ClearRetellCredentialsModal';
import ClearVapiCredentialsModal from '../../shared/modal/lib/credentials/lib/ClearVapiCredentialsModal';
import CredentialsSheet from './components/CredentialsSheet';
import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import PlaygroundFooter from './footer/PlaygroundFooter';
import PlaygroundTopBar from './top-bar/PlaygroundTopBar';
import PlaygroundWorkspace from './workspace/PlaygroundWorkspace';
import SetBlandCredentialsModal from '../../shared/modal/lib/credentials/lib/SetBlandCredentialsModal';
import SetRetellCredentialsModal from '../../shared/modal/lib/credentials/lib/SetRetellCredentialsModal';
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
      <PlaygroundSheets />
    </div>
  );
};

const PlaygroundModals = () => {
  return (
    <>
      <SetVapiCredentialsModal />
      <SetRetellCredentialsModal />
      <SetBlandCredentialsModal />

      <ClearVapiCredentialsModal />
      <ClearRetellCredentialsModal />
      <ClearBlandCredentialsModal />
    </>
  );
};

const PlaygroundSheets = () => {
  return (
    <>
      <CredentialsSheet />
    </>
  );
};

export default Playground;
