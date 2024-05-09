import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';

const BlandCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Bland });

  return (
    <CredentialsCard
      providerName={Providers.Bland.displayName}
      providerImageUrl="/images/logos/bland.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default BlandCredentialsCard;
