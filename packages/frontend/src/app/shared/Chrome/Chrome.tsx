import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Navigation } from '../../components/Home/components/Navigation';

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const NavigationWrapper = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  flex: 5;
`;

const Footer = styled.div`
  flex: 1;
  padding: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Chrome: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Root>
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <Wrapper>{children}</Wrapper>
      <Footer>MEEEMOR = MORE MEEEMES</Footer>
    </Root>
  );
};
