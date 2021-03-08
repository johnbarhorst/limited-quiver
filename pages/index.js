import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Layout } from 'components';

export default function Home() {
  return (
    <Layout>
      <Wrapper>
        <section>
          <h1>Limited Quiver</h1>
          <p>Score keeping for archers of all skill levels</p>
        </section>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled(motion.div)`
  text-align: center;
  display: grid;
  height: calc(100vh - ${props => props.theme.sizes.navHeightMobile});
  align-items: center;
  section {
    padding: 3em;
  }
`;

