import PropTypes from 'prop-types';
import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';
import { Layout, EventFullDisplay, DeleteEventButton, JoinEventButton } from 'components';
import { useUser } from 'hooks';

const EventPage = ({ event }) => {
  const { user } = useUser();

  if(!user) return (
    <Layout title={`Events | ${event.name}`}>
      <EventFullDisplay eventId={event._id} initialData={event} />
    </Layout>
  );

  // TODO: Different views depending on user state and permissions
  return (
    <Layout title={`Events | ${event.name}`}>
      {/* TODO: Should EventFullDisplay be querying for events as well? Or do we just need the initial data here? */}
      <EventFullDisplay eventId={event._id} initialData={event} />
      {/* Make sure user has permissions to delete. */}
      <JoinEventButton event={event}>Join This Event</JoinEventButton>
      {user._id === event.createdBy._id && <DeleteEventButton event={event} >Delete Event</DeleteEventButton>}
    </Layout>
  );
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

