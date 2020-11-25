import { useRouter } from 'next/router';
import { useEvent } from 'hooks';



const EventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { event, eventIsLoading, eventIsError } = useEvent(eventId);

  if (eventIsLoading) return (
    <main>
      <h1>Loading</h1>
    </main>
  )

  if (eventIsError) return (
    <main>
      <h1>There is currently an error.</h1>
    </main>
  )

  return (
    <main>
      <h1>{event.name}</h1>
    </main>
  )
}

export default EventPage;