import { FunctionComponent } from 'react';
import { useModalContext } from '../../utilities/hooks';

export interface AddProviderKeyModalProps {}

const AddProviderKeyModal: FunctionComponent<AddProviderKeyModalProps> = () => {
  const { closeModal } = useModalContext();

  return <div onClick={closeModal}>provider key modal</div>;
};

export default AddProviderKeyModal;
