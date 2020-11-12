import useSWR from 'swr';
import { fetcher } from 'lib/api-helpers';

export const useUser = () => {
  const { data, error } = useSWR('/api/user', fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}