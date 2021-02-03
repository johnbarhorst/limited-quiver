import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from 'hooks';
import {
  CreateEvent,
  Layout,
  Login,
  EventFullDisplay,
  EventList,
  ScrollBox,
} from 'components';
import { H1 } from 'elements';

const EventsHome = () => {
  const { user, userIsLoading, userIsError } = useUser();
  const router = useRouter();

  const changeURL = eventId => {
    router.push(`/events/?eventId=${eventId}`, undefined, { shallow: true });
  }
  return (
    <Layout>
      <H1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >Events</H1>
      <Wrapper>
        <EventContainer>
          {userIsLoading && <h3>Loading user data...</h3>}

          {!user && !userIsLoading && (
            <>
              <h3>You must be logged in to see your events.</h3>
              <Login />
            </>
          )}

          {user && (
            <>
              <ScrollBox height="30rem">
                <EventList events={user.events} clickHandler={changeURL} />
              </ScrollBox>
              <CreateEvent />
            </>
          )}
        </EventContainer>
        <section>
          {router.query.eventId && <EventFullDisplay eventId={router.query.eventId} />}
        </section>
      </Wrapper>
    </Layout>
  )
};

export default EventsHome;

const Wrapper = styled(motion.div)`
  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;

  }
`;

const EventContainer = styled(motion.section)`
  max-width: 30rem;
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