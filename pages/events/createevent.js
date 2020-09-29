import { useState } from 'react';
import { useInput } from 'hooks';

import dateHelpers from 'utils/dateHelpers';


const CreateEvent = () => {
  const [eventName, resetEventName] = useInput('');
  const [date, setDate] = useState();
  const [participantCap, resetParticipantCap] = useInput(1);
  const [rounds, resetRounds] = useInput(1);
  const [shotsPer, resetShotsPer] = useInput(1);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <main>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input type="text" name="eventName" {...eventName} />
        </div>
        <div>
          <label htmlFor="eventDate">Event Date:</label>
          <input type="date" name="eventDate" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="participantCap">Maximum Participants</label>
          <input type="number" name="participantCap" {...participantCap} />
        </div>
        <div>
          <label htmlFor="rounds">Rounds:</label>
          <input type="number" name="rounds" {...rounds} />
        </div>
        <div>
          <label htmlFor="shotsPer">Shots Per Round:</label>
          <input type="number" name="shotsPer" {...shotsPer} />
        </div>
        <div>
          <button type="submit">Create Event</button>
        </div>
      </form>
    </main>
  )
}

export default CreateEvent;