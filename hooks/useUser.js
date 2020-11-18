import { useState, useEffect } from 'react';
import useSWR from 'swr';
import cookie from 'cookie';
import { fetcher } from 'lib/api-helpers';

export const useUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data, error, mutate } = useSWR(isLoggedIn ? '/api/user' : null, fetcher);

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

