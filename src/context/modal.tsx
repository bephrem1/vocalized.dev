import React, { useState } from 'react';

import { ModalId } from '../components/shared/modal/utilities/modal-id';

interface IModalContext {
  isOpen: boolean;
  openModalId: ModalId;
  content: React.ReactNode | null;
  openModal: (data: { content: React.ReactNode; modalId: ModalId }) => void;
  closeModal: () => void;

  requestModalUpdate: (data: { content: React.ReactNode; modalId: ModalId }) => void;
}
export const ModalContext = React.createContext<IModalContext>({
  isOpen: false,
  openModalId: null,
  content: null,
  openModal: () => {},
  closeModal: () => {},

  requestModalUpdate: () => {}
});
export const ModalProvider = ({ children }: { children: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModalId, setOpenModalId] = useState(undefined);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openModal = ({ content, modalId }) => {
    setContent(content);
    setIsOpen(true);
    setOpenModalId(modalId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
    setOpenModalId(null);
  };

  const requestModalUpdate = ({ content, modalId }) => {
    if (isOpen && openModalId === modalId) {
      setContent(content);
    }
  };

  const value = {
    isOpen,
    openModalId,
    content,
    openModal,
    closeModal,

    requestModalUpdate
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
