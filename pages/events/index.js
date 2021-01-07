import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CreateEvent, UserEvents } from 'components';
import { Button } from 'elements';


const EventsHome = () => (
  <main>
    <UserEvents />
    <CreateEvent />
  </main>
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