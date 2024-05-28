import React, { useState } from 'react';

import { ModalId } from '../components/shared/modal/modal-id';

interface IModalContext {
  isOpen: boolean;
  openModalId: ModalId;
  openModal: (data: { modalId: ModalId }) => void;
  closeModal: () => void;
}
export const ModalContext = React.createContext<IModalContext>({
  isOpen: false,
  openModalId: null,
  openModal: () => {},
  closeModal: () => {}
});
export const ModalProvider = ({ children }: { children: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModalId, setOpenModalId] = useState(undefined);

  const openModal = ({ modalId }) => {
    setIsOpen(true);
    setOpenModalId(modalId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setOpenModalId(null);
  };

  const value = {
    isOpen,
    openModalId,
    openModal,
    closeModal
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
