
import { LoginForm, Modal } from 'components';
import { useAppContext } from 'state';



export const LoginModal = () => {
  const { isLoginOpen, setIsLoginOpen } = useAppContext();

  return (
    <Modal
      isModalOpen={isLoginOpen}
      closeModal={() => setIsLoginOpen(false)}
    >
      <LoginForm />
    </Modal>
  )
} 