import { useEvent } from 'hooks';

export const EventFullDisplay = ({ eventId }) => {
  const { event, eventIsError, eventIsLoading } = useEvent(eventId);

  if (eventIsLoading) return (<h3>Loading event...</h3>)

  return (
    <>
      <h5>{event.name}</h5>
    </>
  )
}