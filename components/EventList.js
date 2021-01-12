import { EventSmallDisplay, ScrollBox } from 'components';

export const EventList = ({ events }) => {

  if (events.length < 1) {
    return (
      <section>
        <h3>Looks like you don't have any events yet.</h3>
      </section>
    )
  }

  return (
    <ScrollBox>
      {events.map(event => <EventSmallDisplay event={event} key={event._id} />)}
    </ScrollBox>
  )
}
