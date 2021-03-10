import PropTypes from 'prop-types';
import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';
import { Layout, EventFullDisplay } from 'components';
import { DeleteEventButton } from 'components/DeleteEventButton';
import { useUser } from 'hooks';

const EventPage = ({ event }) => {
  const { user } = useUser();
  const addParticipant = async () => {
    // send event to server for processing
    console.log(event._id);
    const joinEvent = await fetch('/api/events/addParticipant', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event._id)
    });
    const res = await joinEvent.json();
    console.log(res);
    // on success, toast and do ui stuff
    // on failure notify as to why
  };
  return (
    <Layout>
      {/* TODO: Should EventFullDisplay be querying for events as well? Or do we just need the initial data here? */}
      <EventFullDisplay eventId={event._id} initialData={event} />
      {/* Make sure user has permissions to be deleting.
        TODO: Set up roles and permissions, have multiple event views, depending on role
      */}
      <button type="button" onClick={addParticipant} >Join This Event</button>
      {user._id === event.createdBy._id && <DeleteEventButton event={event} >Delete Event</DeleteEventButton>}
    </Layout>
  );
};

EventPage.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
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

