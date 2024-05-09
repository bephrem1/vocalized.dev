import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';

const VapiCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Vapi });

  const { openModal } = useContext(ModalContext);
  const openVapiCredentialsModal = () => {
    openModal({ modalId: ModalId.SetVapiCredentials });
  };
  const openClearVapiCredentialsModal = () => {
    openModal({ modalId: ModalId.ClearVapiCredentials });
  };

  const onClick = credentialsSet ? openClearVapiCredentialsModal : openVapiCredentialsModal;

  return (
    <CredentialsCard
      providerName={Providers.Vapi.displayName}
      providerImageUrl="/images/logos/vapi.png"
      credentialsSet={credentialsSet}
      onClick={onClick}
    />
  );
};

export default VapiCredentialsCard;
