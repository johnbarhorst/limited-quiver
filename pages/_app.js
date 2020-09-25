import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { AppContextWrapper } from 'state';
import { Navigation, LoginModal, SignUpModal } from '../components';
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
        <meta name="description" content="Score keeping resource for archery leagues of all skill levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <LoginModal />
      <SignUpModal />
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
