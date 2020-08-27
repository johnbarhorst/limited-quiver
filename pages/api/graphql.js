import { ApolloServer, gql } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import User from 'models/UserModel';

const typeDefs = gql`

  # type Example {
  #   id: ID!                      Bang behind item makes it required.
  #   reqArray: [SOMETYPE]!        Bang behind array means either [] or [...withData] may be returned.
  #   reqArrWItems: [SOMETYPE!]!   Bang behind both means only [...withData] can be returned
  # }

  scalar Date
  
  enum EventStatus {
    ACTIVE
    FINISHED
  }

  type User {
    id: ID!
    username: String!
    name: Name
  }

  type Name {
    first: String
    last: String
  }

  type Query {
    users: [User]
    userByUsername(username: String!): User
  }
`;

const resolvers = {
  Query: {
    userByUsername(parent, { username }, context, info) {
      console.log(context.db)
      // const regex = new RegExp(username, "i");
      // const result = await User.findOne({ username: { $regex: regex } });
      return context.db;
    },
    users() {
      return
    }
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date",
    parseValue(value) {
      // value from the client
      return new Date(value);
    },
    serialize(value) {
      // value sent to client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null
    }
  })
}

export const config = {
  api: {
    bodyParser: false
  }
}
let db;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    if (!db) {
      try {
        const connection = {};
        mongoose.connect(process.env.MONGO_DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }, () => console.log('DB CONNECT'));
        // connection.isConnected = db.connections[0].readyState;
        db = mongoose.connection;
      } catch (e) {
        console.log("ctx mdb catch error", e)
      }
      return { db }
    }
  }
});
export default apolloServer.createHandler({ path: '/api/graphql' })