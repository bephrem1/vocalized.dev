import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { Projects } from '../../../../../../fixtures/projects';

const VocodeCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: Projects.Vocode.id });

  return (
    <div className="opacity-50 inline">
      <CredentialsCard
        providerName={Projects.Vocode.displayName}
        providerImageUrl="/images/logos/vocode.png"
        credentialsSet={credentialsSet}
      />
    </div>
  );
};

export default VocodeCredentialsCard;
