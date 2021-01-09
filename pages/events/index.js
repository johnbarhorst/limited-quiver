import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from 'hooks';
import { CreateEvent, Layout, Login, EventList, CreateToast } from 'components';

const EventsHome = () => {
  const { user, userIsLoading, userIsError } = useUser();

  return (
    <Layout>
      <h1>Events</h1>
      <Wrapper>
        <EventContainer>
          {user && <EventList events={user.events} />}
          {userIsLoading && <h3>Loading user data...</h3>}
          {!user && !userIsLoading && (
            <section>
              <h3>You must be logged in to see your events.</h3>
              <Login />
            </section>
          )}
        </EventContainer>
        <section>
          <CreateEvent />
          <CreateToast />
        </section>
      </Wrapper>
    </Layout>
  )
};

export default EventsHome;

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2em;
`;

const EventContainer = styled(motion.div)`
  max-width: 30em;
`;