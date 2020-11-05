import nextConnect from 'next-connect';
import passport from 'lib/passport-config';
import middleware from 'middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

// login
handler.post(passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

// logout
handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;