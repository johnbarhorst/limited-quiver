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
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;