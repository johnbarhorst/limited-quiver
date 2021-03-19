import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useToastContext } from 'state';
import { CloseButton } from './CloseButton';
import { Button_LG } from './styles/Buttons';

ReactModal.setAppElement('#__next');

export const DeleteEventButton = ({ children, event, Button = Button_LG }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastContext();
  const router = useRouter();

  // Modal Controls
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleDelete = async () => {
    setIsLoading(true);
    const res = await fetch('/api/event', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });
    if(res.ok) {
      const deletedEvent = await res.json();
      console.log(deletedEvent);
      setIsLoading(false);
      addToast({
        title: 'Event Deleted',
        message: `${event.name} has been removed from the database`
      });
      closeModal();
      return router.push('/events');
    } else {
      // TODO: Better error handling, once we have an idea of what all might happen.
      setIsLoading(false);
      const response = await res.json();
      console.log(response);
    }
  };
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
        <h3>Are you sure you want to delete event</h3>
        <button disabled={isLoading} type="button" onClick={handleDelete}>{isLoading ? 'Deleting' : 'YES!'}</button><button type="button" onClick={closeModal}>NO WAY!</button>
      </ReactModal>
      <Button onClick={openModal}>
        {children}
      </Button>
    </>
  );
};

DeleteEventButton.propTypes = {
  children: PropTypes.elementType,
  Button: PropTypes.elementType,
  event: PropTypes.object
};