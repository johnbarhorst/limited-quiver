import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';

const MongoStore = connectMongo(session);

const sessionMiddleware = (req, res, next) => {
  const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });
  return session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore,
    resave: false,
    saveUninitialized: true,
  })(req, res, next);
}

export default sessionMiddleware;