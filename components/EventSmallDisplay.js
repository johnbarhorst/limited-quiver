import Link from 'next/link';
import { EventCard_Small } from 'elements';
import { convertISODate } from 'lib';

export const EventSmallDisplay = ({ event }) => {
  const eventDate = convertISODate(event.startDate)
  return (
    <Link href={`/events/${event._id}`} >
      <a>
        <EventCard_Small>
          <div>
            <h3>{event.name}</h3>
            <p>Created by: {event.createdBy.username}</p>
          </div>
          <div>
            <p>Rounds: {event.rounds}</p>
            <p>SPR: {event.shotsPer}</p>
            <p>Event Date: {eventDate}</p>
          </div>
        </EventCard_Small>
      </a>
    </Link>
  )
}