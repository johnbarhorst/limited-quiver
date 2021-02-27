import { useState } from 'react';
import ReactModal from 'react-modal';
import { Form, Button, CloseButton } from 'elements';
import { useInput, useMatchingInput, useUser, useLoadingState, loadingStateActionTypes } from 'hooks';
import { useToastContext } from 'state';

ReactModal.setAppElement("#__next");

export const SignUp = ({ SignupButton = Button }) => {
  const {addToast} = useToastContext()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { mutate } = useUser();
  const [username, resetUserName] = useInput('');
  const [email, resetEmail] = useInput('');
  const [password, resetPassword] = useInput('');
  const [passwordMatch, resetPasswordMatch, isMatching] = useMatchingInput('', password.value);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleSubmit = async e => {
    e.preventDefault();
    // Since this isn't using SWR, we manually set a loading state.
    setLoading(true);
    // Reset any previous error.
    setError(null);
    // TODO: UI for password match, and actual pw regex reqs
    if (password.value !== passwordMatch.value) {
      setLoading(false);
      return setError({
        message: 'Password Verification does not match.',
        password: true,
    });
    }
    // get user data from the form states
    const formData = {
      username: username.value,
      email: email.value,
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
      await mutate('/api/user');
      addToast({
        title: `Account Created`,
        message: `Welcome to Limited Quiver, ${username.value}!`
      })
      setLoading(false);
      closeModal();
    } else if(newUser.status === 400) {
      // TODO add error handling
      const results = await newUser.json();
      const [field, value] = Object.entries(results.error.keyValue)[0];
      setError({
        message: `${field} ${value} has already been registered!`,
        [field]: true,
      });
      console.log(`${field} ${value} already registered!`);

      setLoading(false);
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
          <h2>Create an Account</h2>
          <fieldset disabled={loading} aria-busy={loading}>
            {error?.username && <span>{error.message}</span>}
            <label htmlFor="username">
              Username:
              <input type="text" id="username" {...username} required/>
            </label>
            {error?.email && <span>{error.message}</span>}
            <label htmlFor="email">
              Email:
              <input type="email" id="email" {...email} required/>
            </label>
            <label htmlFor="password">
              Password:
              <input type="password" id="password" {...password} required/>
            </label>
            {/* TODO: Less invasive/popping in sort of notification here */}
            {(!isMatching || error?.password) && <span>Passwords do not match</span>}
            <label htmlFor="password-match">
              Verify Password:
              <input type="password" id="password-match" {...passwordMatch} required/>
            </label>
            <Button type="submit">Sign Up!</Button>
          </fieldset>
        </Form>
      </ReactModal>
      <SignupButton onClick={openModal}>Sign Up</SignupButton>
    </>
  )

}