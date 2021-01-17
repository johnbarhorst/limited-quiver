import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { getUser, createUser } from 'lib';

const handler = nextConnect();
handler.use(middleware);

handler.get(getUser);
// handler.post(createUser);

export default handler;