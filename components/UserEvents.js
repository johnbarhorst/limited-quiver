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
  const { participatingEvents, createdEvents } = user;

  return (
    <>
      <div>
        <h3>Participating Events</h3>
        {participatingEvents.length > 0 ? participatingEvents.map(
          event => <EventSmallDisplay event={event} key={event._id} />) 
          : 
          <p>Looks like you don&apos;t have any events yet!</p>
        }
      </div>
      <div>
        <h3>Created Events</h3>
        {createdEvents.length > 0 ? createdEvents.map(
          event => <EventSmallDisplay event={event} key={event._id} />) 
          : 
          <p>Looks like you haven&apos;t created have any events yet!</p>
        }
      </div>
    </>
  );
};

export default UserEvents;
