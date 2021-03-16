import { motion } from 'framer-motion';
import styled from 'styled-components';

export const MainLayoutStyles = styled(motion.main)`
  background: ${props => props.theme.colors.bgPrimary};
  padding-bottom: ${props => props.theme.sizes.navHeightMobile}; 
  color: ${props => props.theme.colors.fontPrimary};
`;