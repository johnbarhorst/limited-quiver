import { EventCard_Small } from 'elements';
import { convertISODate } from 'lib'

export const EventSmallDisplay = ({ event }) => {
  const eventDate = convertISODate(event.startDate)
  return (
    <EventCard_Small>
      <div>
        <h3>{event.name}</h3>
        <p>Created by: {event.createdBy.username}</p>
      </div>
      <div>
        <p>Rounds: {event.rounds}</p>
        <p>SPR: {event.shotsPer}</p>
        <p>{eventDate}</p>
      </div>
    </EventCard_Small>
  )
}