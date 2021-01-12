import styled from 'styled-components';
import { BackButton } from 'components';

export const TopBar = ({ title }) => {
  return (
    <Header>
      <BackButton />
      <p>{title}</p>
    </Header>
  )
}

const Header = styled.header`
text-align: center;
`;