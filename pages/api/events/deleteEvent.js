import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';


const handler = nextConnect();
handler.use(middleware);


handler.delete(async (req, res) => { 
  const eventData = JSON.parse(req.body);
  
  if(!req.user) {
    return res.status(403).json({ success: false, error: 'You must be logged in to manage events.' });
  }
  
  // TODO: Overarching roles and permissions.
  
  // with mongoose, req.user._id is an object, ObjectId.
  // but if you just req.user.id you get a string version.
  // make sure user logged in has deleting permissions
  if(req.user.id !== eventData.createdBy._id) {
    return res.status(403).json({ success: false, error: 'You do not have permission to delete this event' });
  }
  
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