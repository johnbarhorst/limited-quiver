import ReactModal from 'react-modal';
import { LoginForm } from 'components';
import { CloseButton } from 'elements';
import { useAppContext } from 'state';


ReactModal.setAppElement("#__next")
export const LoginModal = () => {
  const { isLoginOpen, setIsLoginOpen } = useAppContext();

  return (
    <ReactModal
      isOpen={isLoginOpen}
    >

      <CloseButton clickHandler={() => setIsLoginOpen(false)} />
      <LoginForm />
    </ReactModal>
  )
} 