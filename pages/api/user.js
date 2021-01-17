import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.get((req, res) => {
  if (!req.user) {
    const error = new Error("Not authorized!");
    error.status = 403;
    throw error;
  }
  res.json(req.user)
});

export default handler;