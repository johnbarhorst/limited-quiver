import { useRouter } from 'next/router';

const EventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  return (
    <main>
      <h1>{eventId}</h1>
    </main>
  )
}

export default EventPage;