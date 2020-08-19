import { useInput } from 'hooks';


const CreateEvent = () => {
  const [eventName, resetEventName] = useInput('');
  const [maxParticipants, resetMaxParticipants] = useInput('');

  return (
    <div>
      <form action="submit">
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input type="text" {...eventName} />
        </div>
        <div>
          <label htmlFor="maxParticipants">Maximum Participants</label>
          <input type="number" {...maxParticipants} />
        </div>
      </form>
    </div>
  )
}

export default CreateEvent;