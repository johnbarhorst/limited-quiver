import { useState } from 'react';
import { useRouter } from 'next/router';
import ReactModal from 'react-modal';
import { useToastContext } from 'state';
import { useInput, useUser, useLoadingState, loadingStateActionTypes } from 'hooks';
import { Form, TextInput, Button_LG, Button, CloseButton, CheckboxLabel } from 'elements';
import { Calendar } from 'components';


ReactModal.setAppElement("#__next");

const generateJoinCode = (length = 4) => {
  const alphabet = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
  let joinCode = '';
  for (let i = 0; i < length; i++) {
    joinCode += alphabet.charAt(Math.floor(Math.random() * 26))
  }
  return joinCode;
}

export const CreateEvent = ({ CreateEventButton = Button_LG }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useUser();
  const { addToast } = useToastContext();
  const [date, setDate] = useState();
  const [joinCode, resetJoinCode] = useInput(generateJoinCode());
  const [isPrivateEvent, resetIsPrivateEvent] = useInput(true);
  const [eventName, resetEventName] = useInput('');
  const [participantCap, resetParticipantCap] = useInput(1);
  const [rounds, resetRounds] = useInput(1);
  const [shotsPer, resetShotsPer] = useInput(1);
  const [participantList, setParticipantList] = useState([user]);

  // Modal Controls
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // Form Handlers
  const resetFormState = () => {
    resetEventName();
    resetIsPrivateEvent();
    resetParticipantCap();
    resetRounds();
    resetShotsPer();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const eventData = {
      name: eventName.value,
      createdBy: user._id,
      admin: [user._id],
      rounds: parseInt(rounds.value),
      shotsPer: parseInt(shotsPer.value),
      startDate: new Date(),
      participantCap: parseInt(participantCap.value),
      private: isPrivateEvent.value,
      participants: participantList,
    }
    const createEvent = await fetch(`/api/events/createevent`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData),
    });

    if (createEvent.status === 201) {
      const response = await createEvent.json();
      resetFormState();
      setLoading(false);
      addToast({
        title: "New Event Created!",
        message: `${response.name} created.`
      });
      router.push(`/events/${response._id}`);
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
        <Form onSubmit={handleSubmit} >
          <h2>Create an Event</h2>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="eventName">Event Name:
            <input type="text" name="eventName" {...eventName} />
            </label>
            <label htmlFor="participantCap">Maximum Participants
            <input type="number" name="participantCap" {...participantCap} />
            </label>
            <label htmlFor="rounds">Rounds:
            <input type="number" name="rounds" {...rounds} />
            </label>
            <label htmlFor="shotsPer">Shots Per Round:
            <input type="number" name="shotsPer" {...shotsPer} />
            </label>
            <span>Private Event</span>
            <CheckboxLabel>
              <input type="checkbox" name="privateEvent" onChange={isPrivateEvent.onChange} checked={isPrivateEvent.value} />
              <span></span>
            </CheckboxLabel>
            <Button type="submit" disabled={createEventLoading}>Create Event</Button>
          </fieldset>
        </Form>
      </ReactModal>
      <CreateEventButton onClick={openModal}>Create an Event</CreateEventButton>
    </>
  )
}