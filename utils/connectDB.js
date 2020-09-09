import mongoose from 'mongoose';

// Declare the db outside. If you do it all inside the context function,
// you end up refreshing the connection every few seconds.
// That's probably bad.
let connection;
async function connectDB() {
  // Check if db is already connected before trying to connect.
  if (!connection) {
    // connnect to db if no connection exists.
    try {
      connection = await mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, () => console.log('DB CONNECT'));
      return connection
    } catch (e) {
      // TODO: Get some error handling here in case db connection fails.
      console.log("DB Connection fail", e);
    }
  }
}

export default connectDB;