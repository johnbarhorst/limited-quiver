import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';


const handler = nextConnect();
handler.use(middleware);

handler.delete(async (req, res) => { 
  const eventData = JSON.parse(req.body);
  try {
    const eventToDelete = await Event.findById(eventData._id);
    await eventToDelete.remove();
    return res.status(200).json({ success: true, eventToDelete });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false });
  }
});

export default handler;