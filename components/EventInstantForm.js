import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAppContext } from 'state';
import { useInput } from 'hooks';
import { ErrorDisplay } from 'components'
import { Form, TextInput, Button, CheckboxLabel } from 'elements';


// type Event {
//   id: String
//   name: String
//   admin: [User]
//   participants: [User]
//   active: Boolean
//   private: Boolean
//   rounds: Int
//   shotsPer: Int
//   scores: Int
//   participantCap: Int
//   startDate: Date
//   endDate: Date
//   }

const CREATE_INSTANT_EVENT = gql`
  mutation createInstantEvent($event: EventInput) {
    newEvent(event: $event) {
      id

    }
  }
`;

export const EventInstantForm = () => {
  const { user } = useAppContext();
  const [createEvent, { data, loading, error }] = useMutation(CREATE_INSTANT_EVENT, {
    onError: err => console.log(err),
    onCompleted: data => console.log(data)
  });
  const [date, setDate] = useState();
  const [isPrivateEvent, resetIsPrivateEvent] = useInput(true);
  const [eventName, resetEventName] = useInput('');
  const [participantCap, resetParticipantCap] = useInput(1);
  const [rounds, resetRounds] = useInput(1);
  const [shotsPer, resetShotsPer] = useInput(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      name: eventName.value,
      admin: [user.id],
      rounds: parseInt(rounds.value),
      shotsPer: parseInt(shotsPer.value),
      startDate: new Date(),
      participantCap: parseInt(participantCap.value),

    }
    createEvent({
      variables: {
        event: eventData
      }
    })
  }

  if (!user) {
    return (
      <div>
        <p>You must be logged in to create an event.</p>
      </div>
    )
  }

  return (
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
      <div>
        {error && <ErrorDisplay message={error.message} />}
      </div>
      <div>
        <Button type="submit">{loading ? "Creating Event" : "Create Event"}</Button>
      </div>
    </Form>
  )
}

