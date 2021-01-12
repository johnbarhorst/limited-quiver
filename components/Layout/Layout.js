import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';


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
      <Wrapper>
        {children}
      </Wrapper>
    </>
  )
}

const Wrapper = styled(motion.main)`
  background: ${props => props.theme.colors.bgPrimary};
  height: calc(100vh - ${props => props.theme.sizes.navHeightMobile});
  color: ${props => props.theme.colors.fontPrimary};
`;