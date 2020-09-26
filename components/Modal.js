import ReactModal from 'react-modal';
import { CloseButton } from 'elements';

ReactModal.setAppElement("#__next");

export const Modal = ({ isModalOpen, children, closeModal = f => f }) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      closeTimeoutMS={300}
      style={{
        overlay: {
          background: 'rgba(0, 0, 0, 0.75)',
        }
      }}
      onRequestClose={closeModal}
    >
      <CloseButton clickHandler={closeModal} />
      {children}
    </ReactModal>
  )
}