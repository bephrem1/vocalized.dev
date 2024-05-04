import { FunctionComponent, useContext } from 'react';

import CredentialCard from '../CredentialCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ProviderId } from '../../../../../../fixtures/providers';

const RetellCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Retell });

  return (
    <CredentialCard
      providerName="Retell"
      providerImageUrl="/images/logos/retell.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default RetellCredentialsCard;
