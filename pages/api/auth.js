import nextConnect from 'next-connect';
import { serialize } from 'cookie';
import passport from 'lib/passport-config';
import middleware from 'middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

// login
handler.post(passport.authenticate('local'), (req, res) => {
  // Second cookie here for reauthorization and getting user data.
  // This feels wrong...
  res.setHeader('Set-Cookie', serialize('LQ_USER', "youareloggedinIguess", {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7
  }));
  res.json(req.user);
});

// logout
handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;