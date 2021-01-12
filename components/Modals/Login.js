import { useState } from 'react';
import ReactModal from 'react-modal';
import { CloseButton, Form, TextInput, Button } from 'elements';
import { useInput, useUser, useLoadingState, loadingStateActionTypes } from 'hooks';

ReactModal.setAppElement("#__next");

export const Login = ({ LoginButton = Button }) => {
  const { mutate } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ loading: loggingIn, error: loginError, success: loginSuccess }, loginDispatch] = useLoadingState();
  const [email, resetEmail] = useInput('');
  const [password, resetPassword] = useInput('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const handleSubmit = async e => {
    e.preventDefault();
    // loading state for the log in, disabling the button below
    //TODO: check accessibility protocol for disabling buttons
    loginDispatch({ type: loadingStateActionTypes.loading });

    const credentials = {
      email: email.value,
      password: password.value
    }
    const user = await fetch('/api/auth', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (user.status === 200) {
      loginDispatch({ type: loadingStateActionTypes.success });
      // use the mutate function from the SWR hook to refresh user data from our user endpoint once we have a session
      mutate();
      closeModal();
      // TODO what if server down? might need a bigger over all solution
      // This only really accounts for incorrect credentials
    } else if (user.status === 401) {
      loginDispatch({ type: loadingStateActionTypes.error });
      resetPassword();
    }
  }
  return (
    <>
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
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <TextInput type="email" placeholder="myEmail@dontspammebro.net" name="email" {...email} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <TextInput type="password" name="password" {...password} />
          </div>
          <div>
            {loginError && <p>Invalid log in credentials, please try again.</p>}
            <Button type="submit" disabled={loggingIn} >Sign in</Button>
          </div>
        </Form>
      </ReactModal>
      <LoginButton onClick={openModal}>Log in</LoginButton>
    </>
  )
}
