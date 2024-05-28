import { FunctionComponent, useContext } from 'react';

import CredentialsCard from '../CredentialsCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { Projects } from '../../../../../../fixtures/projects';

const PlayAICredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: Projects.PlayAI.id });

  return (
    <div className="opacity-50 inline">
      <CredentialsCard
        providerName={Projects.PlayAI.displayName}
        providerImageUrl="/images/logos/playai.png"
        credentialsSet={credentialsSet}
      />
    </div>
  );
};

export default PlayAICredentialsCard;
