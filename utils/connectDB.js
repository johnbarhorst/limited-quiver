import mongoose from 'mongoose';

// Declare the db outside. If you do it all inside the context function,
// you end up refreshing the connection every few seconds.
// That's probably bad.
const connection = {};

const connectDB = async () => {
  // Check if db is already connected before trying to connect.
  if (connection.isConnected) {
    return;
  }
  // connnect to db if no connection exists.
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () => console.log('DB CONNECT'));
    connection.isConnected = dbConnection.connections[0].readyState;
  } catch (e) {
    // TODO: Get some error handling here in case db connection fails.
    console.log("DB Connection fail", e);
  }
}

export default connectDB;