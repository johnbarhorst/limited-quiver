import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { getEvent } from 'lib/eventHandlers';

const handler = nextConnect();
handler.use(middleware);

handler.get(getEvent);

export default handler;