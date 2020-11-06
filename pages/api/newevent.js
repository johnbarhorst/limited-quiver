import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';


// TODO Remember, this is a quick and dirty you did just to do something before vacation!
const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const data = req.body;
  // TODOO: data verification
  const newEvent = new Event(data);
  newEvent.save(error => {
    if (error) {
      // TODO: Proper status code
      res.status(500).json({ message: "Error saving new event to database", error })
    }
  });
  res.status(201).json(newEvent);
});

export default handler;