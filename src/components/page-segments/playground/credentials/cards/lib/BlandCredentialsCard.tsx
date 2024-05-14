import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';

const BlandCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Bland });

  const { openModal } = useContext(ModalContext);
  const openBlandCredentialsModal = () => {
    openModal({ modalId: ModalId.SetBlandCredentials });
  };
  const openClearRetellCredentialsModal = () => {
    openModal({ modalId: ModalId.ClearBlandCredentials });
  };

  const onClick = credentialsSet ? openClearRetellCredentialsModal : openBlandCredentialsModal;

  return (
    <CredentialsCard
      providerName={Providers.Bland.displayName}
      providerImageUrl="/images/logos/bland.png"
      credentialsSet={credentialsSet}
      onClick={onClick}
    />
  );
};

export default BlandCredentialsCard;
