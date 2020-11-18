import nextConnect from 'next-connect';
import passport from 'lib/passport-config';
import session from './session';
import { dbConnect } from 'lib';

// We aren't using these here. But it initializes the schemas into Mongoose.
// Otherwise, we get an error doing things like user.populate()
// Feels weird, there may be a 'better' way. But head + wall cure right now.
import Event from 'models/EventModel';
import User from 'models/UserModel';
import League from 'models/LeagueModel';

const middleware = nextConnect();
dbConnect("Middleware.js");

middleware
  .use(session)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;