
import { useRouter } from 'next/router';



const EventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  if (loading) return (
    <main>
      <h3>Loading...</h3>
    </main>
  )

  if (error) return (
    <main>
      <h3>We couldn't find that event.</h3>
      {/* TODO: Link back to proper place, once proper place exists. Search? Event creation? */}
    </main>
  )
  return (
    <main>
      <h1>{data.eventById.name}</h1>
    </main>
  )
}

export default EventPage;