import nextConnect from 'next-connect';
import passport from 'passport';
import session from './session';
const middleware = nextConnect();

middleware
  .use(session)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;