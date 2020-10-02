import { useState, useEffect } from "react";


export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => { setValue(e.target.type === 'checkbox' ? e.target.checked : e.target.value) } },
    () => setValue(initialValue)
  ];
};

export const useMatchingInput = (initialValue, matchValue) => {
  const [value, setValue] = useState(initialValue);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (value === matchValue) {
      setIsMatching(true);
    } else {
      setIsMatching(false);
    }
  }, [value, matchValue]);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue),
    isMatching,
  ]
}