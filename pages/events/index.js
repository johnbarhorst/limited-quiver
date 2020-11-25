import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserEvents } from 'components';


const EventsHome = () => (
  <Main_3_Col>
    <h1>Events!</h1>
    <section>
      <Link href="/events/createevent">
        <h3>Create an Event</h3>
      </Link>
    </section>
    <section>
      <UserEvents />
    </section>
    <section>
      <h3>Browse Events</h3>
    </section>
  </Main_3_Col>
);

export default EventsHome;

const Main_3_Col = styled(motion.main)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  section {
    border: 1px solid black;
  }
  h1,
  h3 {
    text-align: center;
    grid-column: 1/-1;
  }
`;