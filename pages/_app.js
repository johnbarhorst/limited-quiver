import Head from 'next/head';
import { ToastContextWrapper } from 'state';
import {
  Navigation,
  ToastModule
} from 'components';
import 'styles/normalize.css';
import 'styles/globals.css';

// Normally I name these things differently. But I wasted 15 minutes looking for where to rename
// the app that Next is going to render, before I decided it wasn't worth the time.
const AppToWrap = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <title>Limited Quiver</title>
        <meta name="description" content="Score keeping resource for archery leagues of all skill levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastModule position={"BOTTOM_RIGHT"} />

      <Navigation />
      <Component {...pageProps} />
    </>
  )
}


const MyApp = props => {
  return (
    <ToastContextWrapper>
      <AppToWrap {...props} />
    </ToastContextWrapper>
  )
}

export default MyApp;
