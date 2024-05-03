import CredentialCard from '../CredentialCard';
import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';

const VapiCredentialCard: FunctionComponent<EmptyObject> = () => {
  return (
    <CredentialCard
      providerName="Vapi"
      providerImageUrl="/images/logos/vapi.png"
      credentialsSet={true}
    />
  );
};

export default VapiCredentialCard;
