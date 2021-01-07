import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineChatAlt,
  HiOutlineDotsHorizontal,
  // Leaving this in just in case I change my mind again.
  // HiOutlineUserCircle
} from 'react-icons/hi';
import { GiArcher } from 'react-icons/gi';
import { ActiveLink } from 'components';
import { Nav } from 'elements';
//  If we use styled components for the anchor tags, be sure to add the passHref to each Link.
// This is a requirement with HOCs within Link tags, for SEO purposes.

export const Navigation = () => {
  return (
    <Nav>
      <div>
        <ActiveLink href={"/"} >
          <HiOutlineHome />
          <span className="visible-hidden">Home</span>
        </ActiveLink>
      </div>
      <div>
        <ActiveLink href={"/events"} >
          <HiOutlineCalendar />
          <span className="visible-hidden">Events</span>
        </ActiveLink>
      </div>
      <div>
        <ActiveLink href={"/contact"} >
          <HiOutlineChatAlt />
          <span className="visible-hidden">Contact</span>
        </ActiveLink>
      </div>
      <div>
        <ActiveLink href={"/profiles"} >
          <GiArcher />
          <span className="visible-hidden">User</span>
        </ActiveLink>
      </div>
      <div>
        <a>
          <HiOutlineDotsHorizontal />
          <span className="visible-hidden">More</span>
        </a>
      </div>
    </Nav>
  )
}