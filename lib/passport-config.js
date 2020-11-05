import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import User from '../models/UserModel';

passport.serializeUser((user, done) => {
  console.log("ser: user.id", user.id);
  return done(null, user.id)
});

passport.deserializeUser(async (req, id, done) => {
  const user = await User.findById(id);
  return done(null, user)
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

    const user = await User.findOne({ email: { $regex: regex } }).select("+password");

    // Verify user exists and entered password matches hashed password on file
    if (user && (await compare(password, user.password))) {
      // TODO This might be an expensive operation. Once I have this fleshed out, might want to readjust flow.
      // on success, populate the user fields, and get rid of the password.
      // could populate on the initial user retrieval, but then if password doesn't match, 
      // that's a lot of DB action on a fail.
      // Also, need to test what happens during serialize/deserialize. All this might get wiped?
      // Maybe leave unpopulated, and get data when we need it? Probably better.
      // const populatedUser = await User.findById(user.id).populate("events friends leagues");

      //! Remove password before sending off
      delete user.password;

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