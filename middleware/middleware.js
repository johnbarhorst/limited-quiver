import nextConnect from 'next-connect';
import passport from 'lib/passport-config';
import session from './session';
import dbConnect from 'utils/dbConnect';

const middleware = nextConnect();
dbConnect("Middleware.js");

middleware
  .use(session)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;