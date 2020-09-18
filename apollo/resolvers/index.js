import scalars from './scalars';
import userResolvers from './userResolvers';
import eventResolvers from './eventResolvers';
import composedAuthResolvers from './authResolvers';

const test = {
  Query: {
    sayHello(parent, args, context, info) {
      return "Test Passed"
    },
  },
}

const resolvers = [composedAuthResolvers, userResolvers, eventResolvers, scalars, test]

export default resolvers;