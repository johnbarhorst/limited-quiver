import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';

const handler = nextConnect();
handler.use(middleware);

handler.patch(async (req, res) => {
  const { userId, eventId, joinCode } = req.body;

  // Get event by ID
  // populate the joinCode, it is not sent along by default.
  const event = await Event.findById(eventId).populate("joinCode");
  // findById will return 'falsey' if there isn't any event with that id.
  if (!event) {
    res.status(404).json({ message: `No event found with the id of ${eventId}` });
    return;
  }

  // TODO: Refactor these checks as validation on the mongoose model. Still learning that bit.
  try {
    // We will do this on the front end as well, but this is the doublecheck.
    // Check if participant cap is maxed out.
    if (event.participantCap <= event.participants.length + 1) {
      throw new Error("Participant cap has been reached for this event.");
    }
    // check that user is not already a participant.
    if (event.participants.includes(userId)) {
      throw new Error("User is already participating in this event.");
    }
    // if event is private, check for matching joinCodes.
    if (event.private || event.joinCode !== joinCode) {
      throw new Error("Join code does not match.");
    }

  } catch (e) {
    res.status(422).json({ message: e.message });
  }

  // If all checks pass, add user to the participants array.
  event.participants.push(userId);
  // save changes to db
  await event.save((error) => {
    if (error) {
      res.status(500).json({ message: "Error saving new participant to event", error });
      return;
    }
  });
  // return confirmation
  res.status(201).json(event);
  // TODO: What sort of considerations should be made about adding participants?
  // Invites, confirmation emails, etc... Probably things to worry about if ever other folks are using this app.
});

export default handler;