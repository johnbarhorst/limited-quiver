import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { deleteEvent, getEvent } from 'lib/eventHandlers';

const handler = nextConnect();
handler.use(middleware);

handler.get(getEvent);
handler.delete(deleteEvent);

export default handler;