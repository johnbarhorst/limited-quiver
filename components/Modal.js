import ReactModal from 'react-modal';
import { CloseButton } from 'elements';

ReactModal.setAppElement("#__next");

export const Modal = ({ isModalOpen, children, closeModal = f => f }) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
    >
      <CloseButton clickHandler={closeModal} />
      {children}
    </ReactModal>
  )
}