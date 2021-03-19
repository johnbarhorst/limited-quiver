import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineChatAlt,
} from 'react-icons/hi';
import { GiArcher } from 'react-icons/gi';
import { ActiveLink } from 'components';
import { Nav } from 'components/styles/Nav';

//  If we use styled components for the anchor tags, be sure to add the passHref to each Link.
// This is a requirement with HOCs within Link tags, for SEO purposes.

export const Navigation = () => {
  return (
    <Nav>
      <div>
        <ActiveLink href={'/'} >
          <HiOutlineHome />
          <span>Home</span>
        </ActiveLink>
      </div>
      <div>
        <ActiveLink href={'/events'} >
          <HiOutlineCalendar />
          <span>Events</span>
        </ActiveLink>
      </div>
      <div>
        <ActiveLink href={'/messages'} >
          <HiOutlineChatAlt />
          <span>Messages</span>
        </ActiveLink>
      </div>
      <div>
        <ActiveLink href={'/profiles'} >
          <GiArcher />
          <span>User</span>
        </ActiveLink>
      </div>
    </Nav>
  );
};