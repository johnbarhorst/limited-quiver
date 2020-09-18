import Head from 'next/head';
import { UserContextWrapper } from 'state';
import { Navigation } from '../components';
import 'styles/normalize.css';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContextWrapper>
        <Head>
          <title>Limited Quiver</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation />
        <Component {...pageProps} />
      </UserContextWrapper>
    </>
  )
}

export default MyApp
