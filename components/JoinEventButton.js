import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useToastContext } from 'state';
import { Button_LG, CloseButton } from 'elements';

ReactModal.setAppElement('#__next');

export const JoinEventButton = ({ Button = Button_LG, children, eventId }) => {
  const { addToast } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Controls
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addParticipant = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    // send event to server for processing
    const joinEvent = await fetch('/api/events/addParticipant', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventId)
    });
    if(joinEvent.ok) {
      // on success, toast and do ui stuff
      const res = await joinEvent.json();
      console.log(res);
      addToast({
        title: 'Success!',
        message: `You have succesfully joined ${res.event.name}`
      });
    } else if(joinEvent.status === 422) {
      // on failure notify as to why
      const res = await joinEvent.json();
      setErrorMessage(res.message);
    }
    setIsLoading(false);
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
      </ReactModal>
      <Button disabled={isLoading} onClick={addParticipant} >
        {children}
      </Button>
    </>
  );
};

JoinEventButton.propTypes = {
  Button: PropTypes.elementType,
  children: PropTypes.any,
  eventId: PropTypes.string
};