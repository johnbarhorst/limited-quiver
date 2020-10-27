import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const EVENT_QUERY = gql`
  query GetEvent($id: ID) {
    eventById(id: $id) {
      id
     name
     admin {
       id
       username
     }
     participants {
       id
       username
     }
     active
     private
     rounds
     shotsPer
    # TODO  Add scores here eventually
     participantCap
     startDate
     endDate
    }
  }
`;

const EventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { data, loading, error } = useQuery(EVENT_QUERY, {
    variables: {
      id: eventId
    }
  });


  if (loading) return (
    <main>
      <h3>Loading...</h3>
    </main>
  )

  if (error) return (
    <main>
      <h3>We couldn't find that event.</h3>
      {/* TODO: Link back to proper place, once proper place exists. Search? Event creation? */}
    </main>
  )
  return (
    <main>
      <h1>{data.eventById.name}</h1>
    </main>
  )
}

export default EventPage;