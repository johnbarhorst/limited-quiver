import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';


import { Navigation, ToastModule } from 'components';

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
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
};

const Wrapper = styled(motion.main)`
  background: ${props => props.theme.colors.bgPrimary};
  padding-bottom: ${props => props.theme.sizes.navHeightMobile}; 
  color: ${props => props.theme.colors.fontPrimary};
`;

