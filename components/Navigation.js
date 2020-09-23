import Link from 'next/link';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { useAppContext } from 'state';

// const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `;

export const Navigation = () => {
  const { user, setIsLoginOpen } = useAppContext();
  // const { data, error, loading } = useQuery(IS_LOGGED_IN);
  return (
    <Nav>
      <Link href="/">
        <h3>Limited Quiver</h3>
      </Link>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/leagues" >
          <a>Leagues</a>
        </Link>
        <Link href="/events">
          <a>Events</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
        {user ?
          (
            <Link href={`/profiles/`}>
              <a>{user.username}</a>
            </Link>
          ) : (
            <a onClick={() => setIsLoginOpen(true)} >Login</a>
          )
        }
      </div>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
  a:not(:last-child) {
    padding: 0 2rem;
  }
  a:last-child {
    padding-left: 2rem;
  }
`;