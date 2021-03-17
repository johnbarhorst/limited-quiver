import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { createEvent, deleteEvent, getEvent } from 'lib/eventHandlers';

const handler = nextConnect();
handler.use(middleware);

handler.get(getEvent);
handler.post(createEvent);
handler.delete(deleteEvent);

export default handler;