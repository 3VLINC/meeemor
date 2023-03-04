import { Web3Button } from '@web3modal/react';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { Chrome } from '../../shared/Chrome/Chrome';
import { FindEvent } from './components/FindEvent/FindEvent';

const Root = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex: 1 0 100%; */
`;

const Inside = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Flag = styled.div`
  margin-bottom: 3rem;
`;
const Description = styled.div`
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  font-weight: 500;
  margin: 0;
`;

export const Home: React.FC = () => {
  const { isConnected } = useAccount();

  let button: JSX.Element | null = <FindEvent />;

  if (!isConnected) {
    button = <Web3Button label="Get Started" />;
  }

  return (
    <Chrome>
      <Root>
        <Inside>
          <Flag>
            <Title>MEEEMOR</Title>
          </Flag>
          <Description>
            Incentivize meme creation at your event with MEEEMOR.
          </Description>
          {button}
        </Inside>
      </Root>
    </Chrome>
  );
};
