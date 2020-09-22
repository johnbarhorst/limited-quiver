import { useState } from 'react';

const AllUsers = () => {
  const [usersList, setUsersList] = useState();
  const handleClick = async () => {
    const query = `
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
    const userResponse = await fetch('/api/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
      })
    });
    const userJSON = await userResponse.json();
    if (userJSON.data) {
      setUsersList(userJSON.data.allUsers);
    }
  }
  return (
    <div>
      <h2>All Users</h2>
      {usersList && usersList.map(user => (
        <div>
          <h5>{user.username}</h5>
        </div>
      ))}
      <button onClick={() => handleClick()} >Get Users</button>
    </div>
  )
}

export default AllUsers;