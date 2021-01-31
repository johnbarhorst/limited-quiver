import { EventSmallDisplay } from 'components';

export const EventList = ({ events, clickHandler }) => {

  if (events.length < 1) {
    return (
      <>
        <h3>Looks like you don't have any events yet.</h3>
      </>
    )
  }

  return (
    <>
      {events.map(event => <EventSmallDisplay event={event} key={event._id} clickHandler={() => clickHandler(event)} />)}
    </>
  )
}
