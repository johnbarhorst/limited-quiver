import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  CreateEvent,
  EventSmallDisplay,
  Layout,
} from 'components';
import { H2 } from 'elements';
import { AllEventsList } from 'components/AllEventsList';
import { WithUser } from 'components/WithUser';
import { useUser } from 'hooks';
import { Login, SignUp } from './Modals';

export const EventsHomePage = () => {
  const { user } = useUser();
  console.log(user);
  if(!user) return (
    <Layout title="Events">
      <H2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >Events</H2>
      <CreateEvent />
      <Wrapper>
        <section>
          <h4>You must be logged in to see your events.</h4>
          <Login>Login</Login><SignUp>Sign Up</SignUp>
        </section>
        <section>
          <AllEventsList />
        </section>
      </Wrapper>

    </Layout>
  );
  return (
    <Layout title="Events">
      <H2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >Events</H2>
      <CreateEvent />
      <Wrapper>
        <section>
          <h3>Your Events</h3>
          <WithUser render={(user) => (
            <div>
              <h4>Participating Events</h4>
              {user.participatingEvents.length > 0 ? user.participatingEvents.map(
                event => <EventSmallDisplay event={event} key={event._id} />) 
                : 
                <p>Looks like you don&apos;t have any events yet!</p>
              }
            </div>
          )} /> 
          <WithUser render={(user) => (
            <div>
              <h4>Created Events</h4>
              {user.createdEvents.length > 0 ? user.createdEvents.map(
                event => <EventSmallDisplay event={event} key={event._id} />) 
                : 
                <p>Looks like you don&apos;t have any events yet!</p>
              }
            </div>
          )} /> 
        </section>
        <section>
          <h3>All Events</h3>
          <AllEventsList />
        </section>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled(motion.div)`
  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
  }
`;
