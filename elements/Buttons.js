import { motion } from 'framer-motion';
import { MdClear } from 'react-icons/md';
import styled from 'styled-components';

export const Button = styled(motion.button)`
  width: 7rem;
  padding: 4px 6px;
  border-radius: 5px;
`;

const CloseButtonStyle = styled(motion.button)`
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

export const CloseButton = ({ clickHandler }) => {
  return (
    <CloseButtonStyle onClick={clickHandler} >
      <MdClear />
    </CloseButtonStyle>
  )
}