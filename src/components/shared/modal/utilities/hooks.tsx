import AddCredentialModal, { AddCredentialModalProps } from '../lib/credentials/AddCredentialModal';
import { useContext, useEffect } from 'react';

import { ModalContext } from '../../../../context/modal';
import { ModalId } from './modal-id';

/*
 * Open hooks
 */

export const useAddCredentialModal = (props: AddCredentialModalProps) => {
  const { openFn } = useModalWithUpdate({
    props,
    Component: AddCredentialModal,
    modalId: ModalId.AddCredential
  });

  return { openAddCredentialModal: openFn };
};

/*
 * Base utilities
 */

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

const useModalWithUpdate = ({ props, Component, modalId }) => {
  const { openModal, requestModalUpdate } = useModalContext();

  const _Component = <Component {...props} />;

  useEffect(() => {
    requestModalUpdate({ content: _Component, modalId });
  }, [...Object.values(props)]);

  const openFn = () => {
    openModal({ content: _Component, modalId });
  };

  return { openFn };
};
