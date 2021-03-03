import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TextInput = styled(motion.input)`

`;

export const Form = styled(motion.form)`
  display: grid;
  max-width: 45rem;
  margin: 0 auto;
  box-shadow: var(--elevate_1);

  > div {
    margin: 0 auto .75rem;
  }

  input, label {
    display: block;
    margin-bottom: .25rem;
  }

  input[type=checkbox] {
    display: inline;
  }

  input {
    border-radius: 5px;
    padding: 4px 6px;
    font-size: 1.25rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export const CheckboxLabel = styled(motion.label)`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
  opacity: 0;
  width: 0;
  height: 0;
}
span {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
span:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%
}
input:checked + span {
  background-color: #2196F3;
}

input:focus + span {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + span:before {
  transform: translateX(26px);
}
`;

