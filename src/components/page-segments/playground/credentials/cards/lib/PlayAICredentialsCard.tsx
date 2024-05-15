import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';

const PlayAICredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.PlayAI });

  return (
    <div className="opacity-50 inline">
      <CredentialsCard
        providerName={Providers.PlayAI.displayName}
        providerImageUrl="/images/logos/playai.png"
        credentialsSet={credentialsSet}
      />
    </div>
  );
};

export default PlayAICredentialsCard;
