import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { extractUser } from 'lib/api-helpers';

handler.use(middleware);

handler.get((req, res) => res.json(extractUser(req)));

export default handler;