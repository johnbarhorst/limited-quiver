import Link from 'next/link';
import { useAppContext } from 'state';



export const UserEvents = () => {
  const { user, setIsLoginOpen } = useAppContext();

  if (!user) {
    return (
      <section>
        <h3>You must be logged in to view your events.</h3>
        <button onClick={() => setIsLoginOpen(true)} >Login</button>
      </section>
    )
  }

  if (user.events.length < 1) {
    return (
      <section>
        <h3>Looks like you don't have any events yet!</h3>
        <Link href="/events/createevent">
          <a>Create an Event</a>
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h3>Your Events</h3>
      {user.events.map(event => <p key={event._id}>{event.name}</p>)}
    </section>
  )
}
