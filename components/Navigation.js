import Link from 'next/link';
import styled from 'styled-components';
import { useAppContext } from 'state';
import { GiArcher } from 'react-icons/gi';

// TODO: If we use styled components for the anchor tags, be sure to add the passHref to each Link.
// This is a requirement with HOCs within Link tags, for SEO purposes.

export const Navigation = () => {
  const { user, setIsLoginOpen, isSignUpOpen, setIsSignUpOpen } = useAppContext();

  return (
    <Nav>
      <Link href="/">
        <h3>Limited Quiver</h3>
      </Link>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        {/* TODO: add leagues later */}
        {/* <Link href="/leagues" >
          <a>Leagues</a>
        </Link> */}
        <Link href="/events">
          <a>Events</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
        <Link href="/profiles">
          <a><GiArcher /></a>
        </Link>
      </div>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
  a {
    cursor: pointer;
  }
  a:not(:last-child) {
    padding: 0 2rem;
  }
  a:last-child {
    padding-left: 2rem;
  }
`;