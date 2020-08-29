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
    email: String
  }

  type Name {
    first: String
    last: String
  }

  type Event {
    name: String!
    admin: [User!]
    participants: [User]
    active: Boolean
    private: Boolean
    rounds: Int
    shotsPer: Int
    participantCap: Int

  }

  type Query {
    sayHello: String
    users: [User]
    userByUsername(username: String!): User
  }
# Use inputs to cleanly define args for mutations. Just remember it adds an object layer
  input UserInput {
    id: ID
    username: String
    email: String
    name: NameInput
  }

  input NameInput {
    id: String
    first: String
    last: String
  }

  type Mutation {
    # Make sure you have the required fields from the schema when you're testing
    # Using an input puts the data into args.key
    # ex. newUser(user: UserInput) data is found in args.user within the mutation resolver
    newUser(user: UserInput): [User]
    
  }


`;

const users = [
  {
    id: '12345',
    username: 'CrashXVII',
    email: "crashdsinc@comcast.net",
    name: {
      id: '12345'
    }
  },
  {
    id: '54321',
    username: 'Maximoose',
    email: "moose@thegoose.com",
    name: {
      id: '54321'
    }
  },
  {
    id: '333333',
    username: 'LisaAAAAAAAN',
    email: 'lisaDont@me.bro',
    name: {
      id: '333333'
    }
  }
];

const names = [
  {
    id: '12345',
    first: 'John',
    last: 'Barhorst'
  },
  {
    id: '54321',
    first: 'Max',
    last: 'Anastasi'
  },
  {
    id: '333333',
    first: 'Lisa',
    last: 'Anastasi'
  }
]

const resolvers = {
  Query: {
    //  Quick test function.
    sayHello(parent, args, context, info) {
      return "Test Passed"
    },
    async userByUsername(parent, { username }, context, info) {
      const regex = new RegExp(username, "i");
      const result = await User.findOne({ username: { $regex: regex } });
      return result
    },
    users(parent, args, context, info) {

      return [...users]
    }
  },
  Mutation: {
    // When using inputs up in typeDefs gql, it adds an object layer. Keep that in mind.
    newUser(parent, args, context, info) {
      // Do JS/DB stuff inside here



    },
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
  }),
  // Resolve nested schemas from within the parent object
  User: {
    name: (parent, args, context, info) => {
      // parent here is the User object.
      // Do JS stuff to get what you want. In a DB, do DB things.

      // In my mongo schema, first and last name are just nested in the name property.
      // MDB sends that along normally, but we have to manually assign it here since GQL doesn't nest.
      const { first, last } = parent.name;

      return {
        first,
        last
      }
    }
  }

}

// This disables automatic json parsing. I think graphql data doesn't come in as JSON.
export const config = {
  api: {
    bodyParser: false
  }
}

// Declare the db outside. If you do it all inside the context function,
// you end up refreshing the connection every few seconds.
// That's probably bad, I'm thinking.
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