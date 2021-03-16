import Head from 'next/head';
import PropTypes from 'prop-types';
import { Navigation, ToastModule } from 'components';
import { MainLayout } from 'components/styles/MainLayout';

export const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Limited Quiver{title ? ` | ${title}` :  null}</title>
        <meta name="description" content="Score keeping resource for archery leagues of all skill levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastModule position={'BOTTOM_RIGHT'} />
      <Navigation />
      <MainLayout>
        {children}
      </MainLayout>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
};



