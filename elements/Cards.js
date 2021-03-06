import styled from 'styled-components';
import { motion } from 'framer-motion';

export const EventCard_Small = styled(motion.a)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 10rem;
  width: 20rem;
  padding: 0.25rem .5rem;
  border-radius: 15px;
  box-shadow: ${props => props.theme.shadows.base};
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  ul {
    list-style: none;
  }
`;