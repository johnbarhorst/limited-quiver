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

const AppToWrap = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Limited Quiver</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <LoginModal />
      <Component {...pageProps} />
    </>
  )
}

const MyApp = props => {
  return (
    <ApolloProvider client={client} >
      <AppContextWrapper>
        <AppToWrap {...props} />
      </AppContextWrapper>
    </ApolloProvider>
  )
}

export default MyApp;
