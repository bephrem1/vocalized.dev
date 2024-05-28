import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { Projects } from '../../../../../../fixtures/projects';

const HumeCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Projects.Hume.id });

  const { openModal } = useContext(ModalContext);
  const openHumeCredentialsModal = () => {
    openModal({ modalId: ModalId.SetHumeCredentials });
  };
  const openClearRetellCredentialsModal = () => {
    openModal({ modalId: ModalId.ClearHumeCredentials });
  };

  const onClick = credentialsSet ? openClearRetellCredentialsModal : openHumeCredentialsModal;

  return (
    <CredentialsCard
      providerName={Projects.Hume.displayName}
      providerImageUrl="/images/logos/hume.png"
      credentialsSet={credentialsSet}
      onClick={onClick}
    />
  );
};

export default HumeCredentialsCard;
