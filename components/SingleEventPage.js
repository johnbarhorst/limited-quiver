import PropTypes from 'prop-types';
import { useEvent, useUser } from 'hooks';
import { Layout } from './Layout';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { JoinEventButton } from './JoinEventButton';
import { DeleteEventButton } from './DeleteEventButton';

export const SingleEventPage = ({ eventId, initialData }) => {
  const user = useUser();
  const { event, eventIsError, eventIsLoading } = useEvent(eventId, initialData);

  if (eventIsLoading) return (
    <Layout>
      <h5>Loading event...</h5>
    </Layout>
  );
  if (eventIsError) return (
    <Layout>
      <h5>We encountered an error while loading this event.</h5>
    </Layout>
  );
  if(!event) return null;
  return (
    <Layout title={`${event.name}`}>
      <h5>{event.name}</h5>
      <EventStyles>
        <ul>
          <li>Created by: {event.createdBy.username}</li>
          <li>Rounds: {event.rounds}</li>
          <li>Shots Per Round: {event.shotsPerRound}</li>
          <li>{event.private ? 'This is a private event' : 'This event is open to everyone'}</li>
          <li>Participants: {event.participants.length}/{event.participantCap}</li>
        </ul>
        <JoinEventButton event={event}>Join This Event</JoinEventButton>
        <DeleteEventButton event={event}>Delete Event</DeleteEventButton>
      </EventStyles>
    </Layout>
  );
};

const EventStyles = styled(motion.section)`
  ul {
    list-style: none;
    
  }
`;


SingleEventPage.propTypes = {
  eventId: PropTypes.string,
  initialData: PropTypes.object
};