import { useFetch } from 'hooks';
import { EventSmallDisplay } from './EventSmallDisplay';

export const AllEventsList = () => {
  const { data, error, loading } = useFetch({
    url: '/api/events/getAllEvents'
  });
  if(loading) return <h2>Loading Events...</h2>;
  if(error) return <h2>Error loading events.</h2>;
  return (
    <div>
      {data.allEvents.map(event => (
        <EventSmallDisplay event={event} key={event._id} />
      ))}
    </div>
  );
};
