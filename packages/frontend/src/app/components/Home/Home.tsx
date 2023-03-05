import { Web3Button } from '@web3modal/react';
import { Link } from 'react-router-dom';
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

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  font-weight: 500;
  margin: 0;
`;

const OrCreate = styled(Link)`
  margin-top: 3rem;
`;

const Stream = styled.div``;

const ForCreators = styled.div``;
const ForOrganizers = styled.div``;

export const Home: React.FC = () => {
  const { isConnected } = useAccount();

  let content: JSX.Element | null = (
    <Stream>
      <ForCreators>
        <h2>Meme makers and Attendees</h2>
        <p>Choose a poap from your wallet to vote and submit memes.</p>
        <FindEvent />
      </ForCreators>
      <ForOrganizers>
        <h2>For Organizers</h2>
        <OrCreate to="/create">Post a meme bounty for your next event</OrCreate>
      </ForOrganizers>
    </Stream>
  );

  if (!isConnected) {
    content = <Web3Button label="Get Started" />;
  }

  return (
    <Chrome>
      <Root>
        <Inside>
          <Flag>
            <Title>MEEEMOR</Title>
          </Flag>
          {content}
        </Inside>
      </Root>
    </Chrome>
  );
};
