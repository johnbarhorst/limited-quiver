

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
}


// Fetch wrapper for SWR/useSWR hook.
export const fetcher = (...args) => fetch(...args).then(res => res.json());
