import { useQuery, gql } from '@apollo/client';

const query = gql`
query GetAllUsers {
  allUsers {
    id
    name {
      first
      last
    }
    username
    events {
      id
    }
  }
}
`;

const AllUsers = () => {
  const { loading, error, data } = useQuery(query);
  return (
    <div>
      <h2>All Users</h2>
      {loading && <h2>Loading</h2>}
      {error && <h2>Error</h2>}
      {data && data.allUsers.map(user => (
        <div key={user.id} >
          <h5>{user.username}</h5>
        </div>
      ))}
    </div>
  )
}

export default AllUsers;