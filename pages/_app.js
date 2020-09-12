import Head from 'next/head';
import { Navigation } from '../components';
import 'styles/normalize.css';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
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

export default MyApp
