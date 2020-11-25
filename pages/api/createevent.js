import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';
import User from 'models/UserModel';


// TODO Remember, this is a quick and dirty you did just to do something before vacation!
const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const data = req.body;
  // TODO: data verification
  console.log(data);
  const newEvent = new Event(data);
  newEvent.save(error => {
    if (error) {
      res.status(500).json({ message: "Error saving new event to database", error });
      return;
    }
  });

  // Save new event id to current users list of events:
  const creator = await User.findById(data.createdBy);
  creator.events.push(newEvent.id);
  await creator.save((error) => {
    if (error) {
      res.status(500).json({ message: "Error saving new event to the current user", error });
      return;
    }
  });

  // ToDO: Do we want to push the event to all the participants events? Potential for abuse,
  // maybe have a separate system for that, invites sent out to participants, then add to list upon accept

  res.status(201).json(newEvent);
});

export default handler;