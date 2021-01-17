import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useToastContext } from 'state';
import { useInput, useUser, useLoadingState, loadingStateActionTypes } from 'hooks';
import { Layout } from 'components';
import { Form, TextInput, Button, CheckboxLabel } from 'elements';

const generateJoinCode = (length = 4) => {
  const alphabet = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
  let joinCode = '';
  for (let i = 0; i < length; i++) {
    joinCode += alphabet.charAt(Math.floor(Math.random() * 26))
  }
  return joinCode;
}

const CreateEvent = () => {
  const [{
    loading: createEventLoading,
    error: createEventError,
    success: createEventSuccess }, createEventDispatch] = useLoadingState();
  const router = useRouter();
  const { user } = useUser();
  const { addToast } = useToastContext();
  const [date, setDate] = useState();
  const [isFutureEvent, resetIsFutureEvent] = useInput(false);
  const [isPrivateEvent, resetIsPrivateEvent] = useInput(true);
  const [eventName, resetEventName] = useInput('');
  const [participantCap, resetParticipantCap] = useInput(1);
  const [rounds, resetRounds] = useInput(1);
  const [shotsPer, resetShotsPer] = useInput(1);
  const [joinCode, resetJoinCode] = useInput(generateJoinCode());
  const [participantList, setParticipantList] = useState([user]);

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
    <Layout>
      <AnimateSharedLayout>
        <Form
          onSubmit={handleSubmit}
          layout
        >
          <motion.div layout>
            <label htmlFor="eventName">Event Name:</label>
            <TextInput type="text" name="eventName" {...eventName} />
          </motion.div>
          <motion.div layout>
            <label htmlFor="participantCap">Maximum Participants</label>
            <TextInput type="number" name="participantCap" {...participantCap} />
          </motion.div>
          <motion.div layout>
            <label htmlFor="rounds">Rounds:</label>
            <TextInput type="number" name="rounds" {...rounds} />
          </motion.div>
          <motion.div layout>
            <label htmlFor="shotsPer">Shots Per Round:</label>
            <TextInput type="number" name="shotsPer" {...shotsPer} />
          </motion.div>
          <motion.div layout >
            <label htmlFor="future">Future Event:
            <input type="checkbox" name="future" id="future" onChange={isFutureEvent.onChange} checked={isFutureEvent.value} />
            </label>
          </motion.div>
          <AnimatePresence>
            {isFutureEvent.value && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout>
                <label htmlFor="eventDate">Event Date:</label>
                <TextInput type="date" name="eventDate" value={date} onChange={e => setDate(e.target.value)} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div layout>
            <label htmlFor="privateEvent">Private Event:
            <input type="checkbox" name="privateEvent" onChange={isPrivateEvent.onChange} checked={isPrivateEvent.value} />
            </label>
          </motion.div>
          <AnimatePresence>
            {isPrivateEvent.value && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <label htmlFor="joinCode">Join Code:</label>
                <TextInput type="text" name="joinCode" maxLength="4" {...joinCode} />
              </motion.div>
            )}
          </AnimatePresence>
          {/* <div>
        {createEventError && <ErrorDisplay message={createEventError.message} />}
      </div> */}
          <motion.div layout>
            <Button type="submit" disabled={createEventLoading}>Create Event</Button>
          </motion.div>
        </Form>
      </AnimateSharedLayout>
    </Layout>
  )
}

export default CreateEvent;