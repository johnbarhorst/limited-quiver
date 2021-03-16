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

export const EventsHomePage = () => {
  return (
    <Layout title="Events">
      <H2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >Events</H2>
      <div>
        <CreateEvent />
      </div>
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
