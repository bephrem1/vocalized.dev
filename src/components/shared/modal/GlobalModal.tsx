import { FunctionComponent, useEffect } from 'react';

import ModalBase from './ModalBase';
import { useModalContext } from './utilities/hooks';
import { useRouter } from 'next/router';

interface Props {}

const GlobalModal: FunctionComponent<Props> = () => {
  const { isOpen, content, closeModal } = useModalContext();

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      closeModal();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, closeModal]);

  return (
    <ModalBase isOpen={isOpen} onCloseClick={closeModal}>
      {content}
    </ModalBase>
  );
};

export default GlobalModal;
