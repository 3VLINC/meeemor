import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Root = styled.nav``;
const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`;

const NavItem = styled.li`
  padding: 15px;
`;

export const Navigation = () => {
  return (
    <Root>
      <Nav>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/create">Events</Link>
        </NavItem>
      </Nav>
    </Root>
  );
};
