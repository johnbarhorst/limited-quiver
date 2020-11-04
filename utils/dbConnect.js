import mongoose from 'mongoose';

const connection = {}; /* for caching db connection*/

async function dbConnect(logComment) {
  // Debugging thing.
  if (logComment) {
    console.log(`dbConnect: ${logComment}`);
  }

  /* check if we have connection to the DB */
  if (connection.isConnected) {
    // Don't return the connection. Mongoose is magic.
    return
  }

  /* connecting to DB */
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;