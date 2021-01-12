import useSWR from 'swr';
import { fetcher } from 'lib';

export const useEvent = (eventID) => {
  const { data, error } = useSWR(eventID ? `/api/getEvent/${eventID}` : null, fetcher);

  return {
    event: data,
    eventIsLoading: !error && !data,
    eventIsError: error
  }
}