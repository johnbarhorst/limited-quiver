import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  CreateEvent,
  Layout,
} from 'components';
import { H2 } from 'elements';
import UserEvents from 'components/UserEvents';
import { AllEventsList } from 'components/AllEventsList';

const EventsHome = () => {
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
          <UserEvents />
        </section>
        <section>
          <AllEventsList />
        </section>
      </Wrapper>
    </Layout>
  );
};

export default EventsHome;

const Wrapper = styled(motion.div)`
  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
  }
`;

export async function getServerSideProps({ req, res }) {
  // tap into the middleware
  const handler = nextConnect();
  handler.use(middleware);
  try {
    await handler.run(req, res);
  } catch (error) {
    // TODO Handle errors
    console.log(error);
  }
  if (!req.user) {
    return {
      props: {
        user: null
      }
    };
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(req.user))
    }
  };
}