import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
        <Wrapper>
          <section>
            <h1>Limited Quiver</h1>
            <p>Score keeping for archers of all skill levels</p>
          </section>
        </Wrapper>
      </Layout>
    </>
  )
}

const Wrapper = styled(motion.div)`
  text-align: center;
  display: grid;
  height: calc(100vh - ${props => props.theme.sizes.navHeightMobile});
  align-items: center;
  section {
    background: linear-gradient(${props => props.theme.colors.bgPrimary}, ${props => props.theme.colors.red}, ${props => props.theme.colors.bgPrimary});
    padding: 3em;
  }
`;

