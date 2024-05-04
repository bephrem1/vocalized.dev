import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '../../../../../shared/shadcn/components/ui/dialog';
import { FunctionComponent, useContext } from 'react';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import CredentialCard from '../CredentialCard';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../../../../../shared/elements/Link';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

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

          <div className="absolute right-4 bottom-3">
            <Link type="external" dest={Providers.Vapi.links.homepage} openInNewWindow>
              <div className="w-full h-full flex flex-row items-center justify-center px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
                <p className="text-neutral-500 text-xs mr-1.5"> Visit vapi.ai</p>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-neutral-500"
                  style={{ width: '12px', height: '12px' }}
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-row px-8 pt-5">
          <div className="flex flex-col">
            <DialogTitle className="text-white mb-2">Set Vapi Credentials</DialogTitle>
            <DialogDescription>
              You will only need your public key to start calls.
            </DialogDescription>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default VapiCredentialsCard;
