import { FunctionComponent } from 'react';
import { useModalContext } from '../../utilities/hooks';

export interface AddCredentialModalProps {}

const AddCredentialModal: FunctionComponent<AddCredentialModalProps> = () => {
  const { closeModal } = useModalContext();

  return <div onClick={closeModal}>provider key modal</div>;
};

export default AddCredentialModal;
