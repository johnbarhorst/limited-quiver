import { useRouter } from 'next/router';
import styled from 'styled-components';

// TODO: If we use styled components for the anchor tags,
// and we're using the Link component, be sure to add the passHref to each Link.
// This is a requirement with HOCs within Link tags, for SEO purposes.
// next/link
// passHref - Forces Link to send the href property to its child. Defaults to false

// Since this is basically a custom Link component itself, I think we're good.

export const ActiveLink = ({ href, children }) => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  }

  return (
    <A href={href} onClick={handleClick} isActive={href === router.pathname ? true : false}>
      {children}
    </A>
  )
}

const A = styled.a`
  color: ${props => props.isActive ? props.theme.colors.red : "black"};
`;


