import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';
import { Projects } from '../../../../../../fixtures/projects';

const VapiCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: Projects.Vapi.id });

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
      providerName={Projects.Vapi.displayName}
      providerImageUrl="/images/logos/vapi.png"
      credentialsSet={credentialsSet}
      onClick={onClick}
    />
  );
};

export default VapiCredentialsCard;
