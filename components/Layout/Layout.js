import Head from 'next/head';
import { Navigation, ToastModule } from 'components';

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Limited Quiver</title>
        <meta name="description" content="Score keeping resource for archery leagues of all skill levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastModule position={"BOTTOM_RIGHT"} />
      <Navigation />
      <main>
        {children}
      </main>
    </>
  )
}