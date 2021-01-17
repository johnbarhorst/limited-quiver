import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from 'hooks';
import {
  CreateEvent,
  Layout,
  Login,
  EventFullDisplay,
  EventSmallDisplay,
  ScrollBox,
} from 'components';
import { H1 } from 'elements';

const EventsHome = () => {
  const { user, userIsLoading, userIsError } = useUser();
  const [selectedEvent, setSelectedEvent] = useState();
  return (
    <Layout>
      <H1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >Events</H1>
      <Wrapper>
        <EventContainer>
          {user && (
            <ScrollBox height={'11rem'}>
              {user.events.map(event => <EventSmallDisplay event={event} key={event._id} clickHandler={() => setSelectedEvent(event)} />)}

            </ScrollBox>
          )}
          {userIsLoading && <h3>Loading user data...</h3>}
          {!user && !userIsLoading && (
            <section>
              <h3>You must be logged in to see your events.</h3>
              <Login />
            </section>
          )}
          <CreateEvent />
        </EventContainer>
        <section>
          {selectedEvent && <EventFullDisplay eventId={selectedEvent._id} />}
        </section>
      </Wrapper>
    </Layout>
  )
};

export default EventsHome;

const Wrapper = styled(motion.div)`
  @media screen and (min-width: 640px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2em;
  }
`;

const EventContainer = styled(motion.div)`
  /* max-width: 30em; */
`;

export async function getServerSideProps({ req, res }) {
  // tap into the middleware
  const handler = nextConnect();
  handler.use(middleware);
  try {
    await handler.run(req, res);
  } catch (error) {
    // TODO Handle errors
    console.log(error)
  }
  if (!req.user) {
    return {
      props: {
        user: null
      }
    }
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(req.user))
    }
  }
}