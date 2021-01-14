import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  HiOutlineXCircle,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import Event from 'models/EventModel';
import { Layout, UserDisplay, TopBar } from 'components';

const EventPage = ({ event }) => {
  return (
    <Layout>
      <TopBar title={"Event Details"} />
      <h2>Event Details</h2>
      <Wrapper>
        <DetailsWrapper>
          <h3>{event.name}</h3>
          <UL>
            <li><span>Created By </span><span>{event.createdBy.username}</span></li>
            <li><span>Participant Cap </span><span>{event.participantCap}</span></li>
            <li><span>Rounds </span><span>{event.rounds}</span></li>
            <li><span>Shots Per Round </span><span>{event.shotsPer}</span></li>
            <li><span>Private Event </span><span>{event.private ? <HiOutlineCheckCircle /> : <HiOutlineXCircle />}</span></li>
          </UL>
        </DetailsWrapper>
        <DetailsWrapper>
          <section>
            <h4>Event Admins</h4>
            <UL>
              {event.admin.map(user => <li key={user._id}><UserDisplay user={user} /></li>)}
            </UL>
          </section>
          <section>
            <h4>Participants</h4>
            <UL>{event.participants.map(user => <li key={user._id}><UserDisplay user={user} /></li>)}</UL>
          </section>
        </DetailsWrapper>
      </Wrapper>
    </Layout>
  )
}

export default EventPage;

const Wrapper = styled.div`

@media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .85rem;
}
`;


const DetailsWrapper = styled.section`
  box-shadow: ${props => props.theme.shadows.base};
`;

const UL = styled.ul`
    list-style: none;
    li {
      padding: 1rem 1rem;
    }
`;

export async function getServerSideProps({ req, res, params }) {
  const handler = nextConnect();
  handler.use(middleware);
  try {
    await handler.run(req, res);
  } catch (error) {
    // TODO Handle errors
    console.log(error)
  }
  const event = await Event.findById(params.eventId).populate('admin createdBy participants');

  if (!event) {
    return {
      notFound: true
    }
  }

  return {
    // Parse then stringify, because next doesn't coerse data like javascript will.
    props: { event: JSON.parse(JSON.stringify(event)) }
  }
}