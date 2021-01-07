import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';
import { UserDisplay } from 'components';

const EventPage = ({ event }) => {

  return (
    <main>
      <h1>{event.name}</h1>
      {event.admin.map(user => <UserDisplay user={user} key={user._id} />)}

    </main>
  )
}

export default EventPage;

export async function getServerSideProps({ req, res, params }) {
  const handler = nextConnect();
  handler.use(middleware);
  try {
    await handler.run(req, res);
  } catch (error) {
    // TODO Handle errors
    console.log(error)
  }
  const event = await Event.findById(params.eventId).populate('admin');

  return {
    // Parse then stringify, because next doesn't coerse data like javascript will.
    props: { event: JSON.parse(JSON.stringify(event)) }
  }
}