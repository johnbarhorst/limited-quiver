import Link from 'next/link';
import styled from 'styled-components';

export const Navigation = () => {
  return (
    <Nav>
      <Link href="/">
        <h3>Limited Quiver</h3>
      </Link>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profiles">
          <a>Profiles</a>
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