import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { AppContextWrapper } from 'state';
import { Navigation, LoginModal } from '../components';
import 'styles/normalize.css';
import 'styles/globals.css';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: '/api/graphql',
  cache,
});

// const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `;

// cache.writeQuery({
//   query: IS_LOGGED_IN,
//   data: {
//     isLoggedIn: !!localStorage.getItem("user"),
//   }
// })

const MyApp = ({ Component, pageProps }) => {

  return (
    <ApolloProvider client={client} >
      <AppContextWrapper>
        <Head>
          <title>Limited Quiver</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation />
        <LoginModal />
        <Component {...pageProps} />
      </AppContextWrapper>
    </ApolloProvider>
  )
}

export default MyApp;
