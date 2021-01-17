import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { EventCard_Small } from 'elements';
import { convertISODate } from 'lib';

export const EventSmallDisplay = ({ event, clickHandler = f => f }) => {
  const eventDate = convertISODate(event.startDate)
  return (
    <Wrapper onClick={clickHandler} >
      <EventCard_Small>
        <div>
          <h3>{event.name}</h3>
          <p>Created by: {event.createdBy.username}</p>
        </div>
        <div>
          <p>Rounds: {event.rounds}</p>
          <p>SPR: {event.shotsPer}</p>
          <p>Event Date: {eventDate}</p>
        </div>
      </EventCard_Small>
    </Wrapper>
  )
}

const Wrapper = styled(motion.button)`
  background: none;
  border: none; 
  padding: 0;
`;