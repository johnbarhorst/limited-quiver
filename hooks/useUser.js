import useSWR from 'swr';
import { fetcher } from 'lib/api-helpers';


// TODO Consider the revalidation timing of swr. Every time a component that uses the user loses focus
// SWR will revalidate that data. This could be a lot of extra calls to the server.
// manual refresh button?
// Some other option? 

export const useUser = (initialData) => {
  console.log('Hitting useUser');
  const { data, error, mutate } = useSWR('/api/user', fetcher, initialData ? { initialData } : null);
  console.log('useUser data', data);
  console.log('useUser error', error);
  return {
    user: data,
    userIsLoading: !error && !data,
    userIsError: error,
    mutate,
  };
};

