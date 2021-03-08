

// function for stripping down user object. 
export const extractUser = req => {
  if (!req.user) return null;
  // take only needed user fields to avoid sensitive ones (such as password)
  const {
    name, email,
  } = req.user;
  return {
    name, email
  };
};


// Fetch wrapper for SWR/useSWR hook.
export const fetcher = async (...args) => {
  const res = await fetch(...args);
  if(!res.ok) {
    const error = new Error('Placeholder Error for now');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};


// Log the keys of an object.
export const logKeys = (obj) => {
  console.log(Object.keys(obj));
};

// TODO if we don't use this again. Get rid of it.
export const generateJoinCode = (length = 4) => {
  const alphabet = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
  let joinCode = '';
  for (let i = 0; i < length; i++) {
    joinCode += alphabet.charAt(Math.floor(Math.random() * 26));
  }
  return joinCode;
};
