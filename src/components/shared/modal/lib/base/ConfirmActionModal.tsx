import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../../../shadcn/components/ui/alert-dialog';
import { FunctionComponent, useContext } from 'react';

import { ModalContext } from '../../../../../context/modal';
import { ModalId } from '../../modal-id';

interface SetCredentialsModalProps {
  modalId: ModalId;
  title: string;
  description: string;
  cancelButtonText?: string;
  confirmButtonText: string;
  onConfirm: () => void;
}

const ConfirmActionModal: FunctionComponent<SetCredentialsModalProps> = ({
  modalId,
  title,
  description,
  cancelButtonText = 'Cancel',
  confirmButtonText,
  onConfirm
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

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="bg-neutral-950 border border-neutral-900">
        <AlertDialogHeader className="mb-2">
          <AlertDialogTitle className="text-white">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction className="bg-red-700 hover:bg-red-800" onClick={onConfirm}>
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmActionModal;
