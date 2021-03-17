import useSWR from 'swr';
import { fetcher } from 'lib';

export const useEvent = (eventID, initialData) => {
  const { data, error, mutate } = useSWR(
    eventID ? `/api/event?eventId=${eventID}` : null,
    fetcher,
    initialData ? { initialData } : null);
  return {
    event: data,
    eventIsLoading: !error && !data,
    eventIsError: error,
    mutate
  };
};