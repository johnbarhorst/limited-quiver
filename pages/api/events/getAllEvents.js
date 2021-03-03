import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const allEvents = await Event.find().populate('createdBy');
  res.status(200).json({ success: true, allEvents });
});

export default handler;