import { useRouter } from 'next/router';
import styled from 'styled-components';


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
  color: ${props => props.isActive ? 'red' : "black"};
`;


