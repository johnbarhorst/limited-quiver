import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Button = styled(motion.button)`
  border: 0;
  background: ${props => props.theme.colors.darkBlue};
  color: white;
  font-family: -system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  cursor: pointer;
`;

export const Button_LG = styled(Button)`
  padding: 1.25rem 1.5rem;
`;

export const CloseButtonStyle = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  display: grid;
  align-items: center;
  justify-content: center;
`;

