import PropTypes from 'prop-types';
import { EventSmallDisplay } from 'components';

export const EventList = ({ events }) => {

  if (events.length < 1) {
    return (
      <>
        <h3>Looks like you don&apos;t have any events yet.</h3>
      </>
    );
  }

  return (
    <>
      {events.map(event => <EventSmallDisplay event={event} key={event._id} />)}
    </>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    createdBy: PropTypes.shape({
      _id: PropTypes.string
    })
  })),
};