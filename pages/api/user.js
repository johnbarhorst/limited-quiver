import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.get((req, res) => res.json(req.user));

export default handler;