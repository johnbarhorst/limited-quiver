import { ApolloServer, gql, ApolloError } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { hash } from 'bcrypt';
import User from 'models/UserModel';

const typeDefs = gql`

  # type Example {
  #   id: ID!                      Bang behind item makes it required.
  #   reqArray: [SOMETYPE]!        Bang behind array means either [] or [...withData] may be requested.
  #   reqArrWItems: [SOMETYPE!]!   Bang behind both means only [...withData] can be requested.
  # }

  # Note that required here means required to send with every query.
  # I do not believe it is the same as required fields in the MDB schema/models
  # So while every User we create may need a username at creation, we don't exactly
  # have to send that along with every single data query. (but maybe we want to?)


  # scalars are custom data types. Somehow GQL didn't think Date made the cut.
  # Declare scalars in the typeDefs, and create a resolver for it.
  scalar Date
  
  enum EventStatus {
    ACTIVE
    FINISHED
  }

  type User {
    id: ID
    username: String
    name: Name
    email: String
  }

  type Name {
    first: String
    last: String
  }

  type Event {
    name: String
    admin: [User]
    participants: [User]
    active: Boolean
    private: Boolean
    rounds: Int
    shotsPer: Int
    participantCap: Int

  }

  type Query {
    sayHello: String
    userByUsername(username: String!): User
  }
# Use inputs to cleanly define args for mutations. Just remember it adds an object layer
  input UserInput {
    username: String
    email: String
    name: NameInput
    password: String
  }

# If you have nested/custom fields in your type def, and you want to use inputs with your mutations
# you need to have an input for the nested/custom field as well. Populate that data in the resolver
  input NameInput {
    first: String
    last: String
  }

  type Mutation {
    # Make sure you have the required fields from the schema when you're testing
    # Using an input puts the data into args.key, instead of just args.
    # ex. newUser(user: UserInput) data is found in args.user within the mutation resolver
    newUser(user: UserInput): User
    
  }

  type Subscription {
    eventUpdated: Event
  }
`;

// const pubsub = new PubSub();
// const EVENT_UPDATED = 'EVENT_UPDATED'

const resolvers = {
  // Query Resolvers:
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
  },
  // Mutation Resolvers:
  Mutation: {
    // When using inputs up in typeDefs gql, it adds an object layer. Keep that in mind.
    async newUser(parent, args, context, info) {
      // Do JS/DB stuff inside here

      const data = args.user;
      const regex = new RegExp(`^${data.username}$`, "i");
      const userExists = await User.exists({ username: { $regex: regex } });
      if (userExists) {
        return new ApolloError(
          `A user with username ${data.username} already exists.`,
          "Code RED!",
        )
      }
      try {
        // Hash out the password for safety.
        const password = await hash(data.password, 10);
        const newUser = await User.create({
          ...data,
          password,
        });
        await newUser.save((saveErr) => {
          if (saveErr) {
            return new ApolloError(saveErr, "New User Save Error");
          }
        })
        return newUser;
      } catch (err) {
        return new ApolloError(err, "catch caught error.")
      }
    },

  },
  //  Scalar resolvers
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date",
    parseValue(value) {
      // value from the client
      return new Date(value);
    },
    serialize(value) {
      // value to be sent to client
      return value.getTime();
    },
    parseLiteral(ast) {
      // gets invoked to parse client input that was passed inline in the query.
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null
    }
  }),

  // Nested typeDef resolvers:
  User: {
    name: (parent, args, context, info) => {
      // parent here is the User object.
      // Do JS stuff to get what you want. In a DB, do DB things.

      // In my mongo schema, first and last name are just nested in the name property.
      // MDB sends that along normally, but we have to manually assign it here since GQL doesn't nest.
      const { first, last } = parent.name || { first: null, last: null };

      return {
        first,
        last
      }
    }
  },

  Subscription: {
    eventUpdated: {
      subscribe: () => pubsub.asyncIterator({ EVENT_UPDATED })
    }
  },

}

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