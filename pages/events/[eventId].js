import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';
import { Layout, UserDisplay, TopBar } from 'components';

const EventPage = ({ event }) => {

  return (
    <Layout>
      <TopBar title={"Event Details"} />
      <h1>{event.name}</h1>
      {event.admin.map(user => <UserDisplay user={user} key={user._id} />)}
    </Layout>
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

  if (!event) {
    return {
      notFound: true
    }
  }

  return {
    // Parse then stringify, because next doesn't coerse data like javascript will.
    props: { event: JSON.parse(JSON.stringify(event)) }
  }
}