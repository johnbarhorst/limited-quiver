import { useEffect } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider, useLazyQuery } from '@apollo/client';
import { AppContextWrapper, useAppContext } from 'state';
import {
  Navigation,
  LoginModal,
  SignUpModal,
  ToastModule
} from 'components';
import 'styles/normalize.css';
import 'styles/globals.css';

const cache = new InMemoryCache();



const client = new ApolloClient({
  uri: '/api/graphql',
  cache,
});

// Normally I name these things differently. But I wasted 15 minutes looking for where to rename
// the app that Next is going to render, before I decided it wasn't worth the time.
const AppToWrap = ({ Component, pageProps }) => {
  const { user, setUser, toasts, addToast, removeToast } = useAppContext();

  return (
    <>
      <Head>
        <title>Limited Quiver</title>
        <meta name="description" content="Score keeping resource for archery leagues of all skill levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginModal />
      <SignUpModal />
      <ToastModule toastList={toasts} removeToast={removeToast} position={"BOTTOM_RIGHT"} />

      <Navigation />
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
