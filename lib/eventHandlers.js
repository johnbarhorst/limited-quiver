import Event from 'models/EventModel';
import User from 'models/UserModel';

export const createEvent = async (req, res) => {
  const data = req.body;

  // Double check that user is logged in.
  if(!req.user) {
    return res.status(403).json({ success: false, message: 'Must be logged in to create an event.' });
  }
  // TODO: data verification
  const newEvent = new Event(data);

  try {
    await newEvent.save();
  } catch(error) {
    return res.status(400).json({ success: false, message: 'Error saving event.', error });
  }

  // Save new event id to current users list of events:
  try {
    const creator = await User.findById(data.createdBy);
    creator.events.push(newEvent.id);
    await creator.save();
  } catch(error) {
    return res.status(400).json({ success: false, message: 'Error saving event to creators list.', error });
  }

  // ToDO: Do we want to push the event to all the participants events? Potential for abuse,
  // maybe have a separate system for that, invites sent out to participants, then add to list upon accept

  res.status(201).json(newEvent);
};