import { FunctionComponent, useContext } from 'react';

import ConfirmActionModal from '../../base/ConfirmActionModal';
import { CredentialsContext } from '../../../../../../context/credentials';
import { EmptyObject } from '../../../../../../types/empty';
import { ModalId } from '../../../modal-id';
import { Projects } from '../../../../../../fixtures/projects';
import { toast } from '../../../../shadcn/components/ui/use-toast';

const ClearRetellCredentialsModal: FunctionComponent<EmptyObject> = () => {
  const { clearCredentials } = useContext(CredentialsContext);

  const onConfirm = () => {
    clearCredentials({ providerId: Projects.Retell.id });

    toast({
      title: 'Credentials cleared',
      description: `Your credentials have been cleared.`
    });
  };

  return (
    <ConfirmActionModal
      modalId={ModalId.ClearRetellCredentials}
      title="Clear Retell Credentials"
      description="If you would like to start conversations with Retell later, you will need to set your credentials again."
      confirmButtonText="Clear Retell Credentials"
      onConfirm={onConfirm}
    />
  );
};

export default ClearRetellCredentialsModal;
