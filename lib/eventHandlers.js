import Event from 'models/EventModel';
import Participant from 'models/ParticipantModel';
import User from 'models/UserModel';

export const createEvent = async (req, res) => {
  const data = req.body;

  // Double check that user is logged in.
  if(!req.user) {
    return res.status(403).json({ success: false, message: 'Must be logged in to create an event.' });
  }
  // TODO: data verification
  try {
    // get up to date user data
    const creator = await User.findById(data.createdBy);
    console.log('creator', creator);
    if(!creator) {
      return res.status(500).json({ success: false, message: 'logged in user not in database? you a hacker?' });
    }
    // create new event with supplied data.
    const newEvent = new Event(data);
    
    // create new participant from user and new event data.
    const newParticipant = new Participant({
      user: creator._id,
      event: newEvent._id
    });

    // add new event to creators created events.
    creator.createdEvents.push(newEvent._id);

    // TODO: also do we just assume the creator is participating? 
    creator.participatingEvents.push(newEvent._id);

    // add participant to the new events participants
    newEvent.participants.push(newParticipant._id);

    // save changes to database
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