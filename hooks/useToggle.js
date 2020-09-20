import { useState } from 'react';

export const useToggle = (initial, renameable = false) => {
  const [isToggled, setToggle] = useState(initial);
  const toggle = () => setToggle(prev => !prev);
  return renameable ? [isToggled, setToggle, toggle] : { isToggled, setToggle, toggle };
}