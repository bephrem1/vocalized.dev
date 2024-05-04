import { FunctionComponent, useContext } from 'react';

import ConfirmActionModal from '../../base/ConfirmActionModal';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalId } from '../../../modal-id';
import { Providers } from '../../../../../../fixtures/providers';

const ClearVapiCredentialsModal: FunctionComponent<EmptyObject> = () => {
  const { clearCredentials } = useContext(CredentialsContext);

  const onConfirm = () => {
    clearCredentials({ providerId: Providers.Vapi.id });
  };

  return (
    <ConfirmActionModal
      modalId={ModalId.ClearVapiCredentials}
      title="Clear Vapi Credentials"
      description="If you would like to start conversations with Vapi later, you will need to set your credentials again."
      confirmButtonText="Clear Vapi Credentials"
      onConfirm={onConfirm}
    />
  );
};

export default ClearVapiCredentialsModal;
