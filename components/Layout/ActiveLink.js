import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// TODO: If we use styled components for the anchor tags,
// and we're using the Link component, be sure to add the passHref to each Link.
// This is a requirement with HOCs within Link tags, for SEO purposes.
// next/link
// passHref - Forces Link to send the href property to its child. Defaults to false

// Since this is basically a custom Link component itself, I think we're good.

export function ActiveLink({ href, children }) {
  const router = useRouter();

  const isCurrentPath = (href, pathname) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/') return pathname.includes(href);
    return false;
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <A href={href} onClick={handleClick} isActive={isCurrentPath(href, router.pathname) ? true : false}>
      {children}
    </A>
  );
}

ActiveLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any
};

const A = styled.a`
  color: ${props => props.isActive ? props.theme.fonts.activeColor : props.theme.fonts.navIcon};
`;


