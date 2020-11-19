import { useState, useEffect } from 'react';
import useSWR from 'swr';
import cookie from 'cookie';
import { fetcher } from 'lib/api-helpers';


// TODO Consider the revalidation timing of swr. Every time a component that uses the user loses focus
// SWR will revalidate that data. This could be a lot of extra calls to the server.
// manual refresh button?
// Some other option? 

export const useUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data, error, mutate } = useSWR(isLoggedIn ? '/api/user' : null, fetcher);

  // checking for our cookie set in /api/auth.js.
  useEffect(() => {
    const COOKIES = cookie.parse(document.cookie);
    setIsLoggedIn(COOKIES.LQ_USER ? true : false);
  });

  return {
    user: data,
    userIsLoading: !error && !data,
    userIsError: error,
    mutate,
  }
}

