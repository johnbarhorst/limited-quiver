import ReactModal from 'react-modal';
import { LoginForm } from 'components';
import { useAppContext } from 'state';


ReactModal.setAppElement("#__next")
export const LoginModal = () => {
  const { isLoginOpen, setIsLoginOpen } = useAppContext();

  return (
    <ReactModal
      isOpen={isLoginOpen}
    >
      <h2>Login Modal</h2>
      <button
        onClick={() => setIsLoginOpen(false)}
      >X</button>
      <LoginForm />
    </ReactModal>
  )
} 