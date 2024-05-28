import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { Projects } from '../../../../../../fixtures/projects';

const RetellCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Projects.Retell.id });

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
      providerName={Projects.Retell.displayName}
      providerImageUrl="/images/logos/retell.png"
      credentialsSet={credentialsSet}
      onClick={onClick}
    />
  );
};

export default RetellCredentialsCard;
