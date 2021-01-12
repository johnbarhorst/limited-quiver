import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LayoutWrapper = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex-grow: 1;
  }

  nav,
  footer {
    flex-shrink: 0;
  }
`;