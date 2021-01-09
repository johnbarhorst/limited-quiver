import { CreateEvent, EventSmallDisplay } from 'components';

export const EventList = ({ events }) => {

  if (events.length < 1) {
    return (
      <section>
        <h3>Looks like you don't have any events yet.</h3>
        <CreateEvent />
      </section>
    )
  }

  return (
    <section>
      <h3>Your Events</h3>
      <div>
        {events.map(event => <EventSmallDisplay event={event} key={event._id} />)}
      </div>
    </section>
  )
}
