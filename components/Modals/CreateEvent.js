import { useState } from 'react';
import { useRouter } from 'next/router';
import ReactModal from 'react-modal';
import { useToastContext } from 'state';
import { useInput, useUser, useLoadingState, loadingStateActionTypes } from 'hooks';
import { Form, TextInput, Button_LG, Button, CloseButton, CheckboxLabel } from 'elements';


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
  const [{
    loading: createEventLoading,
    error: createEventError,
    success: createEventSuccess }, createEventDispatch] = useLoadingState();
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
    createEventDispatch({ type: loadingStateActionTypes.loading });
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
      joinCode: isPrivateEvent.value ? joinCode.value : null,
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
      createEventDispatch({ type: loadingStateActionTypes.success });
      resetFormState();
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
          <div>
            <label htmlFor="eventName">Event Name:</label>
            <TextInput type="text" name="eventName" {...eventName} />
          </div>
          <div>
            <label htmlFor="eventDate">Event Date:</label>
            <TextInput type="date" name="eventDate" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="participantCap">Maximum Participants</label>
            <TextInput type="number" name="participantCap" {...participantCap} />
          </div>
          <div>
            <label htmlFor="rounds">Rounds:</label>
            <TextInput type="number" name="rounds" {...rounds} />
          </div>
          <div>
            <label htmlFor="shotsPer">Shots Per Round:</label>
            <TextInput type="number" name="shotsPer" {...shotsPer} />
          </div>
          <div>
            <span>Private Event</span>
            <CheckboxLabel>
              <input type="checkbox" name="privateEvent" onChange={isPrivateEvent.onChange} checked={isPrivateEvent.value} />
              <span></span>
            </CheckboxLabel>
          </div>
          {isPrivateEvent.value && (
            <div>
              <label htmlFor="joinCode">Join Code:</label>
              <TextInput type="text" name="joinCode" {...joinCode} />
            </div>
          )}
          {/* <div>
        {createEventError && <ErrorDisplay message={createEventError.message} />}
      </div> */}
          <div>
            <Button type="submit" disabled={createEventLoading}>Create Event</Button>
          </div>
        </Form>
      </ReactModal>
      <CreateEventButton onClick={openModal}>Create an Event</CreateEventButton>
    </>
  )
}