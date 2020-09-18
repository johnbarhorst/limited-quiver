import { ApolloServer } from 'apollo-server-micro';
import connectDB from 'utils/connectDB';
import typeDefs from 'apollo/typeDefs';
import resolvers from 'apollo/resolvers';
// See models for my reasoning on this chunk here.
import Users from 'apollo/datasources/Users';
import models from 'models';



// This disables automatic json parsing. I think graphql data doesn't come in as JSON.
export const config = {
  api: {
    bodyParser: false
  }
}

connectDB();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {

    const { cookies, headers } = req;

    const token = headers.authorization || '';
    const currentUser = {};
    return { currentUser, token, req, res };
  },
  dataSources: () => ({
    users: new Users(models.User)
  })
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

    // res object keys from context:
    // [
    //   '_events',
    //   '_eventsCount',
    //   '_maxListeners',
    //   'outputData',
    //   'outputSize',
    //   'writable',
    //   '_last',
    //   'chunkedEncoding',
    //   'shouldKeepAlive',
    //   'useChunkedEncodingByDefault',
    //   'sendDate',
    //   '_removedConnection',
    //   '_removedContLen',
    //   '_removedTE',
    //   '_contentLength',
    //   '_hasBody',
    //   '_trailer',
    //   'finished',
    //   '_headerSent',
    //   'socket',
    //   '_header',
    //   '_onPendingData',
    //   '_sent100',
    //   '_expect_continue',
    //   'statusCode',
    //   'flush',
    //   'write',
    //   'end',
    //   'on',
    //   'writeHead',
    //   'status',
    //   'send',
    //   'json',
    //   'redirect',
    //   'setPreviewData',
    //   'clearPreviewData'
    // ]