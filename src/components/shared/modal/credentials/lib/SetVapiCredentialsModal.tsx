import { ProviderId, Providers } from '../../../../../fixtures/providers';

import { EmptyObject } from '../../../../../types/empty';
import { FunctionComponent } from 'react';
import { ModalId } from '../../modal-id';
import SetCredentialsModal from '../SetCredentialsModal';

const SetVapiCredentialsModal: FunctionComponent<EmptyObject> = () => {
  return (
    <SetCredentialsModal
      modalId={ModalId.SetVapiCredentials}
      providerId={ProviderId.Vapi}
      title="Set Vapi Public Key"
      description="Set your Vapi credentials to begin conversations."
      logoPath={Providers.Vapi.logo.localPath}
      credentialFields={['publicKey']}
      bannerBackgroundColor="#092032"
    />
  );
};

export default SetVapiCredentialsModal;
