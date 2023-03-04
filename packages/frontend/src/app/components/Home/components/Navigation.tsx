import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Web3Button } from '@web3modal/react';
import { useAccount } from 'wagmi';

const Root = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Nav = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  list-style: none;
`;

const NavItem = styled.li`
  padding: 15px;
  color: #fff;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.25rem;
`;

export const Navigation = () => {
  const { isConnected } = useAccount();

  return (
    <Root>
      <Nav>
        <NavItem>
          <StyledLink to="/">Home</StyledLink>
        </NavItem>
        <NavItem>{isConnected && <Web3Button label="Connect" />}</NavItem>
      </Nav>
    </Root>
  );
};
