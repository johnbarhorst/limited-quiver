import Head from 'next/head';
import { Layout } from 'components';

export default function Home() {
  return (
    <>
      {/* <Head>
        <title>Limited Quiver</title>
        <meta name="description" content="Score keeping resource for archery leagues of all skill levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Layout>
        <h1>Limited Quiver</h1>
      </Layout>
    </>
  )
}

