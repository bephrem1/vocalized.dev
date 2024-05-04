import { FunctionComponent, useContext } from 'react';

import CredentialCard from '../CredentialCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { ProviderId } from '../../../../../../fixtures/providers';

const VapiCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Vapi });

  const { openModal } = useContext(ModalContext);
  const openVapiCredentialsModal = () => {
    openModal({ modalId: ModalId.SetVapiCredentials });
  };

  return (
    <CredentialCard
      providerName="Vapi"
      providerImageUrl="/images/logos/vapi.png"
      credentialsSet={credentialsSet}
      onClick={openVapiCredentialsModal}
    />
  );
};

export default VapiCredentialsCard;
