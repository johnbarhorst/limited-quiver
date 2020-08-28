import { ApolloServer, gql } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import User from 'models/UserModel';

const db = mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('DB CONNECT'));

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

  type Mutation {
    # Make sure you have the required fields from the schema when you're testing
    newUser(
      id: ID
      username: String
      email: String
    ): [User]
    
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
    sayHello(parent, args, context, info) {
      return "Test Passed"
    },
    async userByUsername(parent, { username }, context, info) {
      console.log('query fired')
      console.log(context.db)
      const regex = new RegExp(username, "i");
      const result = await context.db.Mongoose.models.User.findOne({ username: { $regex: regex } });
      return result
    },
    users(parent, args, context, info) {

      return [...users]
    }
  },
  Mutation: {
    newUser(parent, args, context, info) {
      // Do JS/DB stuff inside here
      console.log(args);
      console.log(info);
      return [...users, { ...args }]

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
  }),
  // Resolve nested schemas from within a parent object
  User: {
    name: (parent, args, context, info) => {
      // parent here is the User object.
      console.log(parent);
      // Do JS stuff to get what you want. In a DB, do DB things.
      const { first, last } = names.filter(name => name.id === parent.id)[0];

      return {
        first,
        last
      }
    }
  }

}

export const config = {
  api: {
    bodyParser: false
  }
}


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db }
});
export default apolloServer.createHandler({ path: '/api/graphql' })