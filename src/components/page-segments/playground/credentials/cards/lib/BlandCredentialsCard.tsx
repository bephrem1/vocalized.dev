import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ProviderId } from '../../../../../../fixtures/providers';

const BlandCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Bland });

  return (
    <CredentialsCard
      providerName="Bland"
      providerImageUrl="/images/logos/bland.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default BlandCredentialsCard;
