import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../../../../shared/shadcn/components/ui/dialog';
import { FunctionComponent, useContext } from 'react';

import { Button } from '../../../../../shared/shadcn/components/ui/button';
import CredentialCard from '../CredentialCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { Input } from '../../../../../shared/shadcn/components/ui/input';
import { Label } from '../../../../../shared/shadcn/components/ui/label';
import { ProviderId } from '../../../../../../fixtures/providers';
import clsx from 'clsx';

const VapiCredentialCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Vapi });

  return (
    <AddCredentialsModalWrapper>
      <div>
        <CredentialCard
          providerName="Vapi"
          providerImageUrl="/images/logos/vapi.png"
          credentialsSet={credentialsSet}
        />
      </div>
    </AddCredentialsModalWrapper>
  );
};

const AddCredentialsModalWrapper = ({ children }) => {
  return (
    <Dialog open={true}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-neutral-950 border border-neutral-500">
        <div className="w-full h-full">
          <img src="/images/logos/vapi.png" className="w-16 h-16 rounded-md" draggable={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VapiCredentialCard;
