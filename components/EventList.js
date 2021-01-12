import { EventSmallDisplay } from 'components';

export const EventList = ({ events }) => {

  if (events.length < 1) {
    return (
      <section>
        <h3>Looks like you don't have any events yet.</h3>
      </section>
    )
  }

  return (
    <>
      {events.map(event => <EventSmallDisplay event={event} key={event._id} />)}
    </>
  )
}
