import useSWR from 'swr';
import fetcher from 'utils/fetcher';

export const useGetUser = username => {
  const { data, error } = useSWR(username ? `/api/users/${username}` : null, fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error
  }
}

