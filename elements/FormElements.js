import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TextInput = styled(motion.input)`

`;

export const Form = styled(motion.form)`
  display: grid;
  max-width: 45rem;
  margin: 0 auto;
  box-shadow: var(--elevate_1);

  div {
    margin: 0 auto;
    margin-bottom: .75rem;
  }

  input, label {
    display: block;
    margin-bottom: .25rem;
  }
  input {
    border-radius: 5px;
    padding: 4px 6px;
    font-size: 1.25rem;


  }
`;