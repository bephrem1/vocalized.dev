import { FunctionComponent, useContext } from 'react';

import CredentialCard from '../CredentialCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ProviderId } from '../../../../../../fixtures/providers';

const BlandCredentialCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Bland });

  return (
    <CredentialCard
      providerName="Bland"
      providerImageUrl="/images/logos/bland.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default BlandCredentialCard;
