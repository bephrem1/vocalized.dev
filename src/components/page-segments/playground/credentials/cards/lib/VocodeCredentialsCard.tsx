import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ProviderId } from '../../../../../../fixtures/providers';

const VocodeCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Vocode });

  return (
    <CredentialsCard
      providerName="Vocode"
      providerImageUrl="/images/logos/vocode.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default VocodeCredentialsCard;
