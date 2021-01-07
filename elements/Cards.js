import styled from 'styled-components';
import { motion } from 'framer-motion';

export const EventCard_Small = styled(motion.section)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
  padding: 0.25em .5em;
  border-radius: 15px;
  margin: 10px 5px;
`;