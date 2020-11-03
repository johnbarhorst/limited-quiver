import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import User from '../models/UserModel';

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (req, id, done) => {
  const user = await User.findById(id);
  return done(null, user);
})

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });
      if (user && (await compare(password, user.password))) done(null, user);
      else done(null, false)
    },
  ),
);

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