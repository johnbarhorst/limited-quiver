import Event from 'models/EventModel';
import Participant from 'models/ParticipantModel';
import User from 'models/UserModel';
import { canDelete } from './permissions';

export const createEvent = async (req, res) => {
  const data = req.body;

  // Double check that user is logged in.
  if(!req.user) {
    return res.status(403).json({ success: false, message: 'Must be logged in to create an event.' });
  }
  // TODO: data verification
  try {
    // get up to date user data
    const creator = await User.findById(req.user._id);
    if(!creator) {
      return res.status(500).json({ success: false, message: 'Logged in user not found in database.' });
    }
    // create new event with supplied data.
    const newEvent = new Event(data);
    
    // create new participant from user and new event data.
    const newParticipant = new Participant({
      user: creator._id,
      event: newEvent._id,
      // TODO: Add event roles/permissions to the participant.
    });

    // TODO: also do we just assume the creator is participating? 
    creator.participatingEvents.push(newEvent._id);

    // add participant to the new events participants
    newEvent.participants.push(newParticipant._id);

    // save changes to database
    await newParticipant.save((error) => {
      if(error) {
        return res.status(500).json({ success: false, message: 'Error saving new participant to database', error });
      }
    });
    await newEvent.save((error) => {
      if(error) {
        return res.status(400).json({ success: false, message: 'Error saving event.', error });
      }
    });
    await creator.save((error) => {
      if(error) {
        return res.status(400).json({ success: false, message: 'Error saving event to creators list.', error });
      }
    });

    // on success, send data
    return res.status(201).json({ success: true, message: 'Event created successfully', newEvent });
  } catch(error) {
    res.status(500).json({ success: false, message: 'Error creating event', error });
  }


  // ToDO: Do we want to push the event to all the participants events? Potential for abuse,
  // maybe have a separate system for that, invites sent out to participants, then add to list upon accept

};

export async function getEvent(req, res) {
  const { eventId } = req.query;
  const event = await Event.findById(eventId).populate('admin participants createdBy');

  if (event) {
    // If we go with a {success: true} system, have to rework the useEvent hook, or all the components that use the data 
    return res.status(200).json(event);
  }
  res.status(400).json({ success: false, message: 'Error creating event.' });
}

export async function deleteEvent(req, res) { 
  const eventData = req.body;
  
  if(!canDelete(req)) {
    return res.status(403).json({ success: false, error: 'You do not have permission to delete this event' });
  }
  
  try {
    // get current user data
    // const user = await User.findById(req.user._id);
    const eventToDelete = await Event.findById(eventData._id);
    await eventToDelete.remove();
    return res.status(200).json({ success: true, eventToDelete });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, error });
  }
}