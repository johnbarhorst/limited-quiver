import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import Event from 'models/EventModel';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const data = JSON.parse(req.body);
  const newEvent = new Event(data);
  newEvent.save((saveErr, savedEvent) => {
    if (saveErr) {
      console.log('Save event error: ', saveErr);
      return res.status(409).json({ success: false, message: saveErr });
    }
    res.status(201).json({ success: true, data: savedEvent });
  })
});

export default handler;