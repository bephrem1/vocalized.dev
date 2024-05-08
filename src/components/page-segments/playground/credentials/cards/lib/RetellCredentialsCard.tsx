import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ProviderId } from '../../../../../../fixtures/providers';

const RetellCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Retell });

  return (
    <CredentialsCard
      providerName="Retell"
      providerImageUrl="/images/logos/retell.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default RetellCredentialsCard;
