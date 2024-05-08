import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ProviderId } from '../../../../../../fixtures/providers';

const HumeCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Hume });

  return (
    <CredentialsCard
      providerName="Hume"
      providerImageUrl="/images/logos/hume.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default HumeCredentialsCard;
