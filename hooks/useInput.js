import { useState, useEffect } from "react";


export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};

export const useMatchingInput = (initialValue, matchValue) => {
  const [value, setValue] = useState(initialValue);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    console.log("v", value);
    console.log("mv", matchValue)
    if (value === matchValue) {
      setIsMatching(true);
    }
    if (value !== matchValue) {
      setIsMatching(false);
    }
  }, [value, matchValue]);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue),
    isMatching,
  ]
}