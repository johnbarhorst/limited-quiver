import PropTypes from 'prop-types';
import Link from 'next/link';
import { EventCard_Small } from 'elements';
import { GiArcher } from 'react-icons/gi';

export const EventSmallDisplay = ({ event }) => {
  return (
    <Link href={`/events/${event._id}`}>
      <EventCard_Small>
        <div>
          <h3>{event.name}</h3>
          <p>Created by: {event.createdBy.username}</p>
        </div>
        <ul>
          <li><GiArcher /> {event.participants.length}/{event.participantCap}</li>
          <li>{event.private ? 'Private' : 'Public'}</li>
        </ul>
      </EventCard_Small>
    </Link>
  );
};

EventSmallDisplay.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    shotsPerRound: PropTypes.number,
    participantCap: PropTypes.number,
    participants: PropTypes.arrayOf(PropTypes.string),
    private: PropTypes.bool,
    createdBy: PropTypes.shape({
      username: PropTypes.string
    }),
  }),
};

