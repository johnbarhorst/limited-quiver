import PropTypes from 'prop-types';
import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';
import { Layout, EventFullDisplay } from 'components';
import { DeleteEventButton } from 'components/DeleteEventButton';

// TODO Why am I passing the event here, and also fetching it in getServerSideProps?
// I think original thought was live updates on the event. Re-explore this whole set up.
const EventPage = ({ event }) => {
  return (
    <Layout>
      <EventFullDisplay eventId={event._id} initialData={event} />
      <DeleteEventButton event={event} >Delete Event</DeleteEventButton>
    </Layout>
  );
};

EventPage.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
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

