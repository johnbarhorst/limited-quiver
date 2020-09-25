import { useAppContext } from 'state';
import { Modal, NewUser } from 'components';

export const SignUpModal = () => {
  const { isSignUpOpen, setIsSignUpOpen } = useAppContext()
  return (
    <Modal
      isModalOpen={isSignUpOpen}
      closeModal={() => setIsSignUpOpen(false)}
    >
      <NewUser />
    </Modal>
  )

}