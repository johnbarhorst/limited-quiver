import useSWR from 'swr';
import { fetcher } from 'lib/api-helpers';

export const useFetch = ({ url, initialData }) => {
  console.log('Hitting useFetch');
  const { data, error, mutate } = useSWR(url, fetcher, initialData ? initialData : null);
  console.log('useFetch data', data);
  console.log('useFetch error', error);
  return {
    data,
    error,
    loading: !data && !error,
    mutate
  };
};