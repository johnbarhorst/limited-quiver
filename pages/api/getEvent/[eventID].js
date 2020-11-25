import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';


const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const event = await Event.findById(req.query.eventId);

  res.json(event);
});

export default handler;