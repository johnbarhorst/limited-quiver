import Head from 'next/head';
import { Nav } from '../components';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Limited Quiver</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
