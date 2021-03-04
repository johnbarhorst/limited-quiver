import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  console.log('hit getAllEvents');
  try {
    const allEvents = await Event.find().populate('createdBy');
    console.log('AllEvents found all events');
    return res.status(200).json({ success: true, allEvents });
  } catch(error) {
    res.status(400).json({ success: false, error });
    console.log(error);
  }
});

export default handler;