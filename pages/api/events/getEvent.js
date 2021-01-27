import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const { eventId } = req.query;
  const event = await Event.findById(eventId).populate("admin participants createdBy");

  if (event) {
    res.json(event);
  }
});

export default handler;