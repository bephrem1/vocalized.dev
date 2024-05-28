import { FunctionComponent, useContext } from 'react';

import ConfirmActionModal from '../../base/ConfirmActionModal';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalId } from '../../../modal-id';
import { Projects } from '../../../../../../fixtures/projects';
import { toast } from '../../../../shadcn/components/ui/use-toast';

const ClearBlandCredentialsModal: FunctionComponent<EmptyObject> = () => {
  const { clearCredentials } = useContext(CredentialsContext);

  const onConfirm = () => {
    clearCredentials({ providerId: Projects.Bland.id });

    toast({
      title: 'Credentials cleared',
      description: `Your credentials have been cleared.`
    });
  };

  return (
    <ConfirmActionModal
      modalId={ModalId.ClearBlandCredentials}
      title="Clear Bland Credentials"
      description="If you would like to start conversations with Bland later, you will need to set your credentials again."
      confirmButtonText="Clear Bland Credentials"
      onConfirm={onConfirm}
    />
  );
};

export default ClearBlandCredentialsModal;
