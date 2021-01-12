import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  font-size: 2rem;
  background: ${props => props.theme.bg.primary};
  height: ${props => props.theme.sizes.navHeightMobile};
  color: ${props => props.theme.fonts.navIcon};

  
	/* transform: translateZ(0); */
  a {
    span {
      display: block;
      font-size: 10px;
    }
    cursor: pointer;
  }
`;