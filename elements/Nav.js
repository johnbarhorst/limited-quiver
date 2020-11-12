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
  background: #fff;
  padding: 1.25rem 0;

  will-change: transform;
	transform: translateZ(0);
  a {
    cursor: pointer;
    flex-grow: 1;
  }
`;