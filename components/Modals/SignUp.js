import { useState } from 'react';
import ReactModal from 'react-modal';
import { Form, Button, CloseButton } from 'elements';
import { TextInput } from 'components';
import { useInput, useMatchingInput, useUser, useLoadingState, loadingStateActionTypes } from 'hooks';

ReactModal.setAppElement("#__next");

export const SignUp = ({ SignupButton = Button }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useUser();
  const [{ loading: signUpLoading, error: signUpError, success: signUpSuccess }, signUpDispatch] = useLoadingState();
  const [username, resetUserName] = useInput('');
  const [email, resetEmail] = useInput('');
  const [firstname, resetFirstName] = useInput('');
  const [lastname, resetLastName] = useInput('');
  const [password, resetPassword] = useInput('');
  const [passwordMatch, resetPasswordMatch, isMatching] = useMatchingInput('', password.value);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async e => {
    e.preventDefault();
    signUpDispatch({ type: loadingStateActionTypes.loading });
    // TODO: UI for password match, and actual pw regex reqs
    if (password.value !== passwordMatch.value) return console.log('Passwords need to match');
    // get user data from the form states
    const formData = {
      username: username.value,
      email: email.value,
      name: {
        first: firstname.value,
        last: lastname.value
      },
      password: password.value
    }
    const newUser = await fetch('/api/user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (newUser.status === 201) {
      signUpDispatch({ type: loadingStateActionTypes.success });
      mutate('/api/user');
      closeModal();
    } else {
      signUpDispatch({ type: loadingStateActionTypes.error });
    }
    // TODO add error handling
  }

  const formReset = () => {
    resetUserName();
    resetEmail();
    resetFirstName();
    resetLastName();
    resetPassword();
    resetPasswordMatch();
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
            <TextInput type="text" placeholder="User Name" name="username" controls={username} id="username" required >
              Username:
            </TextInput>
          </div>
          <div>
            <TextInput type="email" placeholder="myEmail@dontspammebro.net" name="email" id="email" controls={email} >
              Email:
            </TextInput>
          </div>
          <div>
            <TextInput type="text" name="firstname" controls={firstname} id="firstname">
              First Name:
            </TextInput>
          </div>
          <div>
            <TextInput type="text" name="lastname" controls={lastname} id="lastname" >
              Last Name:
              </TextInput>
          </div>
          <div>
            <TextInput type="password" name="password" controls={password} id="password" >
              Password:
            </TextInput>
          </div>
          <div>
            <TextInput type="password" name="password" controls={passwordMatch} id="passwordmatch" >
              Verify Password:
            </TextInput>
          </div>
          <div>
            {isMatching ? <p>Matches</p> : <p>Doesn't Match</p>}

          </div>
          <div>
            <Button type="submit" disabled={signUpLoading}>Register</Button>
          </div>
        </Form>
      </ReactModal>
      <SignupButton onClick={openModal}>Sign Up</SignupButton>
    </>
  )

}