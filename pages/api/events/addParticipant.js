import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';
import Participant from 'models/ParticipantModel';
import User from 'models/UserModel';

const handler = nextConnect();
handler.use(middleware);

handler.patch(async (req, res) => {
  const eventId = req.body;
  // check that user is logged in
  if(!req.user) {
    return res.status(403).json({ success: false, message: 'Must be logged in to perform this action.' });
  }
  
  try {
    // Get event by ID
    const event = await Event.findById(eventId);
    // get up to date user data.
    const currentUser = await User.findById(req.user._id);
    // findById will return 'falsey' if there isn't any item in the db with that id.
    if (!event) {
      return res.status(404).json({ success: false, message: `No event found with the id of ${eventId}` });
    }
    if(!currentUser) {
      return res.status(404).json({ success: false, message: `No user found with the id of ${req.user._id}` });
    }

    // TODO: Refactor these checks as validation on the mongoose model? Or no, so we can control the error?
    // We will do this on the front end as well, but this is the doublecheck.
    // Check if participant cap is maxed out.
    if (event.participantCap <= event.participants.length) {
      return res.status(422).json({ success: false, message: 'Participant cap has been reached for this event.' });
    }
    // check that user is not already a participant.
    const isAlreadyParticipating = currentUser.createdEvents.includes(event._id) || currentUser.participatingEvents.includes(event._id);
    if (isAlreadyParticipating) {
      return res.status(422).json({ success: false, message: 'User is already participating in this event.' });
    }

    // If all checks pass, create a new Participant from the user data.
    const newParticipant = new Participant({
      user: req.user._id,
      event: eventId,
    });

    // save new participant to the db
    await newParticipant.save((error) => {
      if(error) {
        return res.status(500).json({ success: false, message: 'Error saving new participant to database', error });
      }
    });

    // after successful save, add participant to event, and event to user.
    event.participants.push(newParticipant._id);
    currentUser.participatingEvents.push(event._id);
    
    await event.save((error) => {
      if (error) {
        return res.status(500).json({ message: 'Error saving new participant to event', error });
      }
    });
    await currentUser.save((error) => {
      if (error) {
        return res.status(500).json({ message: 'Error saving event to user', error });
      }
    });
    // return confirmation
    return res.status(201).json({ success: true, event });
    // TODO: What sort of considerations should be made about adding participants?
    // Invites, confirmation emails, etc... Probably things to worry about if ever other folks are using this app.
  } catch(error) {
    res.status(422).json({ success: false, message: error.message });
  }


});

export default handler;