import { useState } from 'react';
import ReactModal from 'react-modal';
import { CloseButton, Form, TextInput, Button } from 'elements';
import { useInput, useUser } from 'hooks';

ReactModal.setAppElement("#__next");

export const Login = () => {
  const { mutate } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, resetEmail] = useInput('');
  const [password, resetPassword] = useInput('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const handleSubmit = async e => {
    e.preventDefault();
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
      mutate();
      closeModal();
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
            <Button type="submit">Sign in</Button>
          </div>
        </Form>
      </ReactModal>
      <Button onClick={openModal}>Login</Button>
    </>
  )
}
