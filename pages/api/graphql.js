import { ApolloServer } from 'apollo-server-micro';
import mongoose from 'mongoose';
import typeDefs from 'typeDefs';
import resolvers from 'resolvers';

// This disables automatic json parsing. I think graphql data doesn't come in as JSON.
export const config = {
  api: {
    bodyParser: false
  }
}

// Declare the db outside. If you do it all inside the context function,
// you end up refreshing the connection every few seconds.
// That's probably bad.
let db;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Check if db is already connected before trying to connect.
    if (!db) {
      // connnect to db if no connection exists.
      try {
        db = await mongoose.connect(process.env.MONGO_DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }, () => console.log('DB CONNECT'));
      } catch (e) {
        // TODO: Get some error handling here in case db connection fails.
        console.log("DB Connection fail", e);
      }
    }
    return { db }
  }
});

export default apolloServer.createHandler({ path: '/api/graphql' })