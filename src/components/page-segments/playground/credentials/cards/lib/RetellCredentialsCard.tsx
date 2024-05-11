import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';

const RetellCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Retell });

  const { openModal } = useContext(ModalContext);
  const openRetellCredentialsModal = () => {
    openModal({ modalId: ModalId.SetRetellCredentials });
  };
  const openClearRetellCredentialsModal = () => {
    openModal({ modalId: ModalId.ClearRetellCredentials });
  };

  const onClick = credentialsSet ? openClearRetellCredentialsModal : openRetellCredentialsModal;

  return (
    <CredentialsCard
      providerName={Providers.Retell.displayName}
      providerImageUrl="/images/logos/retell.png"
      credentialsSet={credentialsSet}
      onClick={onClick}
    />
  );
};

export default RetellCredentialsCard;
