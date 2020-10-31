import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { AppContextWrapper, useAppContext } from 'state';
import {
  Navigation,
  LoginModal,
  SignUpModal,
  ToastModule
} from 'components';
import 'styles/normalize.css';
import 'styles/globals.css';

// Normally I name these things differently. But I wasted 15 minutes looking for where to rename
// the app that Next is going to render, before I decided it wasn't worth the time.
const AppToWrap = ({ Component, pageProps }) => {
  const { user, setUser, toasts, addToast, removeToast } = useAppContext();

  return (
    <Provider session={pageProps.session}>
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
    </Provider>
  )
}


const MyApp = props => {
  return (

    <AppContextWrapper>
      <AppToWrap {...props} />
    </AppContextWrapper>

  )
}

export default MyApp;
