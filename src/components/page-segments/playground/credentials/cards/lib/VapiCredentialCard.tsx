import { FunctionComponent, useContext } from 'react';

import CredentialCard from '../CredentialCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ProviderId } from '../../../../../../fixtures/providers';

const VapiCredentialCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Vapi });

  return (
    <CredentialCard
      providerName="Vapi"
      providerImageUrl="/images/logos/vapi.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default VapiCredentialCard;
