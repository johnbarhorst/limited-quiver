import useSWR from 'swr';
import { fetcher } from 'lib';

export const useEvent = (eventID, initialData) => {
  const { data, error } = useSWR(
    eventID ? `/api/events/getEvent?eventId=${eventID}` : null,
    fetcher,
    initialData ? { initialData } : null);

  return {
    event: data,
    eventIsLoading: !error && !data,
    eventIsError: error
  }
}