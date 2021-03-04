import mongoose from 'mongoose';

export async function dbConnect(logMessage) {
  if(logMessage) {
    console.log(logMessage);
  }
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  console.log('hit dbConnect');
  if (mongoose.connection.readyState >= 1) {
    console.log('Reusing connection');
    return;
  }

  console.log('new connection');
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

