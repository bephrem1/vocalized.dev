import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';

const RetellCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Retell });

  return (
    <CredentialsCard
      providerName={Providers.Retell.displayName}
      providerImageUrl="/images/logos/retell.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default RetellCredentialsCard;
