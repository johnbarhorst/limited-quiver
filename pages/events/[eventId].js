import PropTypes from 'prop-types';
import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';
import { SingleEventPage } from 'components';


const EventPage = ({ event }) => {
  return <SingleEventPage event={event} />;
};

EventPage.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    createdBy: PropTypes.shape({
      _id: PropTypes.string
    })
  })
};

export default EventPage;

export async function getServerSideProps({ req, res, params }) {
  const handler = nextConnect();
  handler.use(middleware);
  try {
    await handler.run(req, res);
  } catch (error) {
    // TODO Handle errors
    console.log(error);
  }
  const event = await Event.findById(params.eventId).populate('admin createdBy participants');

  if (!event) {
    return {
      notFound: true
    };
  }

  return {
    // Parse then stringify, because next doesn't coerse data like javascript will.
    props: { event: JSON.parse(JSON.stringify(event)) }
  };
}

