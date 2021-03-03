import { useUser } from 'hooks';
import { EventSmallDisplay } from './EventSmallDisplay';
import { Login } from './Modals';

const UserEvents = () => {
  const { user, userIsLoading } = useUser();
  if(userIsLoading) return <h3>Loading User Data...</h3>;
  if(!user) return (
    <>
      <h3>You must log in to see your events.</h3>
      <Login />
    </>
  );
  const { events } = user;

  return (
    <div>
      {events.length > 0 ? events.map(
        event => <EventSmallDisplay event={event} key={event._id} />) 
        : 
        <p>Looks like you don&apos;t have any events yet!</p>
      }
    </div>
  );
};

export default UserEvents;
