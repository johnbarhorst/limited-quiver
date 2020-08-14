import mongoose from 'mongoose';

const connection = {};

async function dbConnect(req, res, next) {
  if (connection.isConnected) return next();

  const db = await mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => console.log('DB CONNECT'));

  connection.isConnected = db.connections[0].readyState;
  console.log('Connection:', connection.isConnected);
  return next();
}


export default dbConnect;
