import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { AuthenticationError } from 'apollo-server-micro';

// An example of composing resolvers from graphql-tools docs.
// Currently this file exists for future me, as something to come back to for a better way to handle things.

const authResolvers = {
  Query: {
    myQuery: (root, args, context) => {
      if (args.something === '1') {
        return true;
      }

      return false;
    },
  },
};

const isAuthenticated = () => next => async (root, args, context, info) => {
  console.log(context);
  if (!context.currentUser) {
    return new AuthenticationError('You are not authenticated!');
  }

  return next(root, args, context, info);
};

const hasRole = (role) => next => async (root, args, context, info) => {
  if (!context.currentUser.roles || !context.currentUser.roles.includes(role)) {
    return new AuthenticationError('You are not authorized!');
  }

  return next(root, args, context, info);
};

const resolversComposition = {
  'Query.myQuery': [isAuthenticated(), hasRole('EDITOR')],
};

const composedAuthResolvers = composeResolvers(authResolvers, resolversComposition);

export default composedAuthResolvers;                                                       