import PropTypes from 'prop-types';
import { useUser } from 'hooks';
import { Layout } from './Layout';
import { 
  EventFullDisplay,
  JoinEventButton,
  DeleteEventButton } from 'components';

export function SingleEventPage({ event }) {
  const { user } = useUser();

  if(!user) return (
    <Layout title={`Events | ${event.name}`}>
      <EventFullDisplay eventId={event._id} initialData={event} />
    </Layout>
  );

  // TODO: Different views depending on user state and permissions
  return (
    <Layout title={`Events | ${event.name}`}>
      {/* TODO: Should EventFullDisplay be querying for events as well? Or do we just need the initial data here? */}
      <EventFullDisplay eventId={event._id} initialData={event} />
      {/* Make sure user has permissions to delete. */}
      <JoinEventButton event={event}>Join This Event</JoinEventButton>
      {user._id === event.createdBy._id && <DeleteEventButton event={event} >Delete Event</DeleteEventButton>}
    </Layout>
  );
}

SingleEventPage.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    createdBy: PropTypes.shape({
      _id: PropTypes.string
    })
  })
};