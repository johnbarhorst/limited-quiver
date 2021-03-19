import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  AllEventsList,
  CreateEvent,
  EventList,
  Layout,
} from 'components';
import { useUser } from 'hooks';
import { Login, SignUp } from './Modals';
import { H2 } from './styles/Headings';

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
          <div>
            <h4>Events You&apos;re Participating In</h4>
            <EventList events={user.participatingEvents} />
          </div>
          <div>
            <h4>Your Created Events</h4>
            <EventList events={user.createdEvents} />
          </div>
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
