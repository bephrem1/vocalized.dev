import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalContext } from '../../../../../../context/modal';
import { ModalId } from '../../../../../shared/modal/modal-id';

const HumeCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);
  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Hume });

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
      providerName={Providers.Hume.displayName}
      providerImageUrl="/images/logos/hume.png"
      credentialsSet={credentialsSet}
      onClick={onClick}
    />
  );
};

export default HumeCredentialsCard;
