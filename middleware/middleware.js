import nextConnect from 'next-connect';
import passport from 'lib/passport-config';
import sessionMiddleware from './session';
import { dbConnect } from 'lib';

/* eslint-disable no-unused-vars */
// We aren't actually using these here. But it seems to initialize the schemas into Mongoose.
// Otherwise, we get an error doing things like user.populate()
// Feels weird, there may be a 'better' way. But head + wall cure right now.
import Event from 'models/EventModel';
import User from 'models/UserModel';
import League from 'models/LeagueModel';
import Participant from 'models/ParticipantModel';

const middleware = nextConnect();

// Next examples show db connection chained after sessionMiddleware.
// But for us, on Vercel, if you don't load the db first, we get sporadic time outs on our serverless funcs
middleware
  .use(async (req, res, next) => {
    await dbConnect('Middleware.js');
    next();
  })
  .use(sessionMiddleware)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;