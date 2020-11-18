import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import User from '../models/UserModel';

passport.serializeUser((user, done) => {
  console.log("Ser User");
  return done(null, user.id)
});

passport.deserializeUser(async (req, id, done) => {
  console.log("deser user");
  const user = await User.findById(id)
    .populate({
      path: 'events',
      populate: {
        path: 'admin',
        select: "username email"
      }
    });
  if (!user) {
    // For cases where user no longer exists, but that session was still viable
    return done(null, false);
  }


  return done(null, user);
})

passport.use(new LocalStrategy(
  // strategy options:
  // passReqToCallback: passes req as first arg in callback.
  // usernameField: changes from default of user.username to specified property
  { passReqToCallback: true, usernameField: "email" },
  // callback function:
  async (req, email, password, done) => {

    // RegExp for insensitive case, and exact matching
    const regex = new RegExp(`^${email}$`, "i");

    // Find user by email, and make sure to get the password
    // PW doesn't get sent normally, on purpose. Set in our model
    const user = await User.findOne({ email: { $regex: regex } }).select("+password");

    // Verify user exists and entered password matches hashed password on file
    if (user && (await compare(password, user.password))) {
      // TODO I think that serialize user gets called immediately after this, and strips all but the id.
      // If that's incorrect, we gotta get that password off of here before we send that out.
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
));

export default passport;

// Original code from the blog. But I'm using mongoose, so I'm doing it differently.

// passport.serializeUser((user, done) => {
//   done(null, user._id.toString());
// });

// // passport#160
// passport.deserializeUser((req, id, done) => {
//   req.db
//     .collection('users')
//     .findOne(ObjectId(id))
//     .then((user) => done(null, user));
// });

// passport.use(
//   new LocalStrategy(
//     { usernameField: 'email', passReqToCallback: true },
//     async (req, email, password, done) => {
//       const user = await req.db.collection('users').findOne({ email });
//       if (user && (await bcrypt.compare(password, user.password))) done(null, user);
//       else done(null, false)
//     },
//   ),
// );