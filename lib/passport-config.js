import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import User from '../models/UserModel';

passport.serializeUser((user, done) => {
  console.log("Serialize User:", user);
  return done(null, user)
});

passport.deserializeUser((req, id, done) => {
  console.log("deserialize");
  return done(null, user)
})

passport.use(new LocalStrategy(
  // strategy options:
  { passReqToCallback: true },
  // callback function:
  function (req, username, password, done) {
    console.log("Strat Un", username);
    console.log("Strat pw", password);
    return done(null, { stuff: "Stuff!" });
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