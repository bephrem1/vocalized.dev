import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../shadcn/components/ui/accordion';
import { CredentialName, CredentialsContext } from '../../../../context/credentials';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '../../shadcn/components/ui/dialog';
import { FunctionComponent, useContext, useState } from 'react';
import { ProviderId, Providers } from '../../../../fixtures/providers';

import { Button } from '../../shadcn/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '../../shadcn/components/ui/input';
import { Label } from '../../shadcn/components/ui/label';
import Link from '../../elements/Link';
import { ModalContext } from '../../../../context/modal';
import { ModalId } from '../modal-id';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from '../../../../helpers/empty';
import { toTitlecase } from '../../../../helpers/strings';

interface SetCredentialsModalProps {
  modalId: ModalId;
  providerId: ProviderId;
  title: string;
  description: string;
  logoPath: string;
  credentialFields: Array<CredentialName>;
  bannerBackgroundColor: string;
}

const SetCredentialsModal: FunctionComponent<SetCredentialsModalProps> = ({
  modalId,
  providerId,
  title,
  description,
  logoPath,
  credentialFields,
  bannerBackgroundColor
}) => {
  const { openModalId, openModal, closeModal } = useContext(ModalContext);
  const isOpen = openModalId === modalId;
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    } else {
      openModal({ modalId });
    }
  };

  const { getCredentials, setCredentials } = useContext(CredentialsContext);
  const credentials = getCredentials({ providerId: providerId });

  const [inputValues, setInputValues] = useState<Record<string, string>>(
    credentialFields.reduce((acc, field) => {
      const value = credentials?.[field] || ''; // try to prefill with set value

      return { ...acc, [field]: value };
    }, {})
  );
  const getHandleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const inputHandlers = credentialFields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: getHandleInputChange(field)
    }),
    {}
  );

  const saveDisabled = Object.values(inputValues).some(isEmpty);
  const onSave = () => {
    setCredentials({
      providerId: providerId,
      credentials: inputValues
    });

    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-neutral-950 border border-neutral-900">
        <div className="w-full h-full">
          <div
            className="relative w-full h-36 flex flex-row items-center justify-center rounded-tl-md rounded-tr-md"
            style={{ backgroundColor: bannerBackgroundColor }}
          >
            <img
              src={logoPath}
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
          <div className="flex flex-row px-8 pt-6 pb-6">
            <div className="flex flex-col w-full">
              <div className="w-full mb-5">
                <DialogTitle className="text-white mb-2">{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </div>
              <div className="flex flex-col w-full mb-4">
                {credentialFields.map((field) => (
                  <div key={field} className="mb-4 last:mb-0">
                    <Label htmlFor={field} className="text-white text-sm">
                      <p className="mb-2">{toTitlecase(field)}</p>
                    </Label>
                    <Input
                      id={field}
                      type="password"
                      className="w-full bg-neutral-900 text-white px-4 border-solid border-neutral-800 rounded-sm"
                      value={inputValues[field]}
                      onChange={inputHandlers[field]}
                    />
                  </div>
                ))}
              </div>
              <Accordion type="single" collapsible className="mb-8">
                <AccordionItem value="public-key" className="border-b-neutral-600">
                  <AccordionTrigger className="text-neutral-400 pb-3">
                    Where can I find my Vapi public key?
                  </AccordionTrigger>
                  <AccordionContent>
                    <span className="text-xs">
                      <p className="text-neutral-200 inline leading-4">
                        Your Vapi public key will be in your{' '}
                      </p>
                      <Link type="external" dest={Providers.Vapi.links.dashboard}>
                        dashboard
                      </Link>
                      <p className="text-neutral-200 inline leading-4"> in the </p>
                      <Link type="external" dest={Providers.Vapi.links.credentials}>
                        "organization" tab
                      </Link>
                      <p className="text-neutral-200 inline leading-4">. Copy & paste it above.</p>
                    </span>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="w-full flex">
                <Button
                  className=" flex-grow px-10 bg-neutral-200 text-neutral-950 hover:bg-neutral-300"
                  onClick={onSave}
                  disabled={saveDisabled}
                >
                  <p>Save</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetCredentialsModal;
