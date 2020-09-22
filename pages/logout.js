import { useAppContext } from 'state';

const Logout = () => {
  const { setUser } = useAppContext();
  const handleLogout = async e => {
    e.preventDefault();
    const mutation = `mutation LogoutUser {
      logoutUser 
    }`;
    const logoutResponse = await fetch('/api/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Pass mutation string along with user
      body: JSON.stringify({
        query: mutation
      })
    });
    const logoutStatus = await logoutResponse.json();
    if (logoutStatus.data.logoutUser) {
      setUser(null);
    }
  }
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={e => handleLogout(e)} >Logout!</button>
    </div>
  )
}

export default Logout;