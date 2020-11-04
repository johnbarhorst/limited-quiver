import nextConnect from 'next-connect';
import passport from 'lib/passport-config';
import middleware from 'middleware/middleware';

const handler = nextConnect();

handler.use(middleware);
handler.post(passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

export default handler;