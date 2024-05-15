import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';

const SindarinCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Vocode });

  return (
    <div className="opacity-50 inline">
      <CredentialsCard
        providerName={Providers.Sindarin.displayName}
        providerImageUrl="/images/logos/sindarin.png"
        credentialsSet={credentialsSet}
      />
    </div>
  );
};

export default SindarinCredentialsCard;
