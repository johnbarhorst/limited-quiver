import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ScrollBox = ({ children, height }) => {
  return (
    <Box height={height}>
      <BoxWrapper>
        {children}
      </BoxWrapper>
    </Box>
  )
}

const Box = styled(motion.section)`
  position: relative;
  overflow: hidden;
  height: ${props => props.height ? props.height : '100%'}
`;

const BoxWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  max-width: 100vw;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  > * + * {
    margin: 0 0 0 2em;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;