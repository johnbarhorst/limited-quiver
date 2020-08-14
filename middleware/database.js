import mongoose from 'mongoose';
import nextConnect from 'next-connect';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => console.log('DB CONNECT'));

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
}


export default dbConnect;
