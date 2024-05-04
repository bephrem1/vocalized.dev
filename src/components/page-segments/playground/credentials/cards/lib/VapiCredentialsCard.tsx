import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '../../../../../shared/shadcn/components/ui/dialog';
import { FunctionComponent, useContext } from 'react';

import CredentialCard from '../CredentialCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ProviderId } from '../../../../../../fixtures/providers';

const VapiCredentialsCard: FunctionComponent<EmptyObject> = () => {
  const { checkCredentialsSet } = useContext(CredentialsContext);

  const credentialsSet = checkCredentialsSet({ providerId: ProviderId.Vapi });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <CredentialCard
            providerName="Vapi"
            providerImageUrl="/images/logos/vapi.png"
            credentialsSet={credentialsSet}
          />
        </div>
      </DialogTrigger>
      <VapiCredentialsDialogContent />
    </Dialog>
  );
};

const VapiCredentialsDialogContent = () => {
  return (
    <DialogContent className="bg-neutral-950 border border-neutral-900">
      <div className="w-full h-full">
        <div
          className="relative w-full h-36 flex flex-row items-center justify-center rounded-tl-md rounded-tr-md"
          style={{ backgroundColor: '#092032' }}
        >
          <img
            src="/images/logos/vapi.png"
            className="rounded-md mr-6"
            draggable={false}
            style={{
              width: '67px',
              height: '67px'
            }}
          />
        </div>
        <div className="flex flex-row px-8 pt-5">
          <div className="flex flex-col">
            <DialogTitle className="text-white mb-2">Set Vapi Credentials</DialogTitle>
            <DialogDescription>
              Set your Vapi credentials to interact with Vapi in the playground.
            </DialogDescription>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default VapiCredentialsCard;
