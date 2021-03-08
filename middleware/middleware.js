import nextConnect from 'next-connect';
import passport from 'lib/passport-config';
import sessionMiddleware from './session';
import { dbConnect } from 'lib';

/* eslint-disable no-unused-vars */
// We aren't using these here. But it initializes the schemas into Mongoose.
// Otherwise, we get an error doing things like user.populate()
// Feels weird, there may be a 'better' way. But head + wall cure right now.
import Event from 'models/EventModel';
import User from 'models/UserModel';
import League from 'models/LeagueModel';

const middleware = nextConnect();

middleware
  .use(sessionMiddleware)
  .use(async (req, res, next) => {
    await dbConnect('Middleware.js');
    next();
  })
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;