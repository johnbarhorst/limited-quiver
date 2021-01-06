import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';

const EventPage = ({ event }) => {

  return (
    <main>
      <h1>{event.name}</h1>
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
    console.log(error)
  }
  const event = await Event.findById(params.eventId);

  return {
    // Parse then stringify, because next doesn't coerse data like javascript will.
    props: { event: JSON.parse(JSON.stringify(event)) }
  }
}