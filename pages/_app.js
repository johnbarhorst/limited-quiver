import Head from 'next/head';
import { AppContextWrapper } from 'state';
import { Navigation } from '../components';
import 'styles/normalize.css';
import 'styles/globals.css';

const AppToWrap = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <title>Limited Quiver</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Component {...pageProps} />
    </>
  )
}

function MyApp(props) {
  return (
    <>
      <AppContextWrapper>
        <AppToWrap {...props} />
      </AppContextWrapper>
    </>
  )
}

export default MyApp;
