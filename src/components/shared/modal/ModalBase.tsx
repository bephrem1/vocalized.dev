import { BORDER_RADII, Z_INDEX } from '../../../design/core/constants';
import { FunctionComponent, useContext } from 'react';
import { ScreenSizes, compareScreenSizes } from '../../../design/core/responsive';

import { ApplicationContext } from '../../../context/application';
import Color from 'tinycolor2';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onCloseClick: () => void;
  children: React.ReactNode;
}

const positioningStyle = {
  left: '50%',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)'
};

const ModalBase: FunctionComponent<Props> = ({ isOpen, onCloseClick, children }) => {
  const { screenSize } = useContext(ApplicationContext);
  const isMobile = compareScreenSizes(screenSize, ScreenSizes.medium) <= 0;

  const borderRadius = isMobile
    ? `${BORDER_RADII.MEDIUM} ${BORDER_RADII.MEDIUM} 0 0`
    : BORDER_RADII.MEDIUM;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseClick}
      closeTimeoutMS={300}
      style={{
        overlay: {
          backgroundColor: Color('#D0D2DE').setAlpha(0.5).toRgbString(),
          zIndex: Z_INDEX.MAXIMUM
        },
        content: {
          backgroundColor: '#232324',
          width: 'fit-content',
          height: 'fit-content',
          maxWidth: '800px',
          minHeight: '200px',
          maxHeight: '95vh',
          borderRadius,
          border: 'none',
          top: '50%',
          padding: 0,
          ...positioningStyle
        }
      }}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      {children}
    </Modal>
  );
};

export default ModalBase;
