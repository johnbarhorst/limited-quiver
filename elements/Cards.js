import styled from 'styled-components';
import { motion } from 'framer-motion';

export const EventCard_Small = styled(motion.section)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  box-shadow: ${props => props.theme.elevation.elevate1};
  padding: 0.25em .5em;
  border-radius: 15px;
`;