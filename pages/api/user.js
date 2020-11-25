import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { removeTokenCookie } from 'lib';

const handler = nextConnect();
handler.use(middleware);

handler.get((req, res) => {
  if (!req.user) {
    // I don't know if there's a way this endpoint would get hit without the cookie being there,
    // but if there is no user session, lets make sure we pull that cookie off.

    removeTokenCookie(res);
    const error = new Error("Not authorized!");
    error.status = 403;
    throw error;
  }
  res.json(req.user)
});

export default handler;