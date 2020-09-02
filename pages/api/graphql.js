import { ApolloServer } from 'apollo-server-micro';
import connectDB from 'utils/connectDB';
import typeDefs from 'typeDefs';
import resolvers from 'resolvers';

// This disables automatic json parsing. I think graphql data doesn't come in as JSON.
export const config = {
  api: {
    bodyParser: false
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const { cookies, headers } = req;
    const db = await connectDB();
    const token = headers.authorization || '';

    return { db }
  }
});

export default apolloServer.createHandler({ path: '/api/graphql' });

// req object keys from context:
// [
    //   '_readableState',   'readable',
    //   '_events',          '_eventsCount',
    //   '_maxListeners',    'socket',
    //   'httpVersionMajor', 'httpVersionMinor',
    //   'httpVersion',      'complete',
    //   'headers',          'rawHeaders',
    //   'trailers',         'rawTrailers',
    //   'aborted',          'upgrade',
    //   'url',              'method',
    //   'statusCode',       'statusMessage',
    //   'client',           '_consuming',
    //   '_dumped',          'cookies',
    //   'query',            'previewData',
    //   'preview'
    // ]