import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';


const MongoStore = connectMongo(session);

export default function sessionMiddleware(req, res, next) {
  const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });
  return session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false
    },
    name: "LQ_USER"
  })(req, res, next);
}

