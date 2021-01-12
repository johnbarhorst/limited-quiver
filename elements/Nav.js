import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  font-size: 2rem;
  background: ${props => props.theme.colors.bgElement};
  padding: 1.25rem 0;

	/* transform: translateZ(0); */
  a {
    cursor: pointer;
    flex-grow: 1;
  }
`;