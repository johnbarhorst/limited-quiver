import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ScrollBox = ({ children, height }) => {
  return (
    <Box>
      <BoxWrapper>
        {children}
      </BoxWrapper>
    </Box>
  )
}

const Box = styled(motion.section)`
  position: relative;
  overflow: hidden;
  height: ${props => props.height ? height : '20em;'}
`;

const BoxWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;