import { useEvent } from 'hooks';

export const EventFullDisplay = ({ eventId, initialData }) => {
  const { event, eventIsError, eventIsLoading } = useEvent(eventId, initialData);

  if (eventIsLoading) return (
    <>
      <h5>Loading event...</h5>
    </>
  )
  if (eventIsError) return (<h5>We encountered an error while loading this event.</h5>)
  return (
    <>
      <h5>{event.name}</h5>
      <div>
        <ul>
          <li>Created by: {event.createdBy.username}</li>
          <li>Rounds: {event.rounds}</li>
          <li>Shots Per Round: {event.shotsPer}</li>
          <li>{event.private ? "This is a private event" : "This event is open to everyone"}</li>
          <li>Maximum Participants: {event.participantCap}</li>
        </ul>


      </div>
    </>
  )
}