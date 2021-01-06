import Link from 'next/link';
import { useUser } from 'hooks';
import { EventDisplay, Login } from 'components';


export const UserEvents = () => {
  const { user, userIsLoading, userIsError } = useUser();

  if (!user) {
    return (
      <section>
        <h3>You must be logged in to view your events.</h3>
        <Login />
      </section>
    )
  }

  if (user.events.length < 1) {
    return (
      <section>
        <h3>Looks like you don't have any events yet.</h3>
        <Link href="/events/createevent">
          <a>Create an Event</a>
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h3>Your Events</h3>
      {user.events.map(event => <EventDisplay event={event} key={event._id} />)}
    </section>
  )
}
