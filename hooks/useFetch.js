import useSWR from 'swr';
import { fetcher } from 'lib/api-helpers';

export const useFetch = ({ url, initialData }) => {
  const { data, error, mutate } = useSWR(url, fetcher, initialData ? initialData : null);
  return {
    data,
    error,
    loading: !data && !error,
    mutate
  };
};