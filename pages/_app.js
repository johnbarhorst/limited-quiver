import { useEffect } from 'react';
import cookie from 'cookie';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useLazyQuery } from '@apollo/client';
import { AppContextWrapper, useAppContext } from 'state';
import { Navigation, LoginModal, SignUpModal, FooterComponent } from 'components';
import { LayoutWrapper } from 'elements'
import 'styles/normalize.css';
import 'styles/globals.css';

const cache = new InMemoryCache();

const REFRESH_USER = gql`
  query getUser($id: ID) {
    userById(id: $id) {
      id
      username
      name {
        first
        last
      }
      events {
        id
      }
    }
  }
`;

const client = new ApolloClient({
  uri: '/api/graphql',
  cache,
});

// Normally I name these things differently. But I wasted 15 minutes looking for where to rename
// the app that Next is going to render, before I decided it wasn't worth the time.
const AppToWrap = ({ Component, pageProps }) => {
  const { user, setUser } = useAppContext();
  const [getUser, { data, loading, error }] = useLazyQuery(REFRESH_USER, {
    onError: err => console.log(err),
    onCompleted: () => setUser(data.userById)
  });
  useEffect(() => {
    const COOKIES = cookie.parse(document.cookie);
    if (!user && COOKIES.LQ_USER) {
      getUser({ variables: { id: COOKIES.LQ_USER } });

    }
  }, [])
  return (
    <>
      <Head>
        <title>Limited Quiver</title>
        <meta name="description" content="Score keeping resource for archery leagues of all skill levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginModal />
      <SignUpModal />
      <LayoutWrapper>
        <Navigation />
        <Component {...pageProps} />
        <FooterComponent />
      </LayoutWrapper>
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
