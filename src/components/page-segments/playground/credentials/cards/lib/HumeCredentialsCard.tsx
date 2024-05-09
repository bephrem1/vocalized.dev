import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';

const HumeCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Hume });

  return (
    <CredentialsCard
      providerName={Providers.Hume.displayName}
      providerImageUrl="/images/logos/hume.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default HumeCredentialsCard;
