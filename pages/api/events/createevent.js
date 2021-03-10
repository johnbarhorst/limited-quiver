import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { createEvent } from 'lib/eventHandlers';



// TODO Remember, this is a quick and dirty you did just to do something before vacation!
const handler = nextConnect();
handler.use(middleware);

handler.post(createEvent);


export default handler;