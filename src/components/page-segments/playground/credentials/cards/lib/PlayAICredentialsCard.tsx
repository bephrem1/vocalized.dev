import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';

const PlayAICredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.PlayAI });

  return (
    <CredentialsCard
      providerName={Providers.PlayAI.displayName}
      providerImageUrl="/images/logos/playai.png"
      credentialsSet={credentialsSet}
    />
  );
};

export default PlayAICredentialsCard;
