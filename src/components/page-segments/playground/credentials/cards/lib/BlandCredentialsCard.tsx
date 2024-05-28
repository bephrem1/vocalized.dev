import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { Projects } from '../../../../../../fixtures/projects';

const BlandCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Projects.Bland.id });

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
      providerName={Projects.Bland.displayName}
      providerImageUrl="/images/logos/bland.png"
      credentialsSet={credentialsSet}
      onClick={onClick}
    />
  );
};

export default BlandCredentialsCard;
