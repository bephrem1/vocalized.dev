import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';

const VocodeCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Vocode });

  return (
    <CredentialsCard
      providerName={Providers.Vocode.displayName}
      providerImageUrl="/images/logos/vocode.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default VocodeCredentialsCard;
