import styled from 'styled-components';
import { Chrome } from '../../shared/Chrome/Chrome';
import { FindEvent } from './components/FindEvent/FindEvent';

const Title = styled.h1``;

const Description = styled.h1``;

export const Home: React.FC = () => {
  return (
    <Chrome>
      <Title>Meeemor</Title>
      <Description>Fostering Web3 Community Through Memes</Description>
      <FindEvent />
    </Chrome>
  );
};
