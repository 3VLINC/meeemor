import { useMocks } from '../../../../../shared/Mocks/Mocks';
import { Meme } from './components/Meme';
import styled from 'styled-components';

const Scroll = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

export const MemeList = ({ eventId }: { eventId: string }) => {
  const { memes } = useMocks();

  const memesForEvent = memes(eventId);

  return (
    <Scroll>
      {memesForEvent.map((meme) => (
        <Meme key={meme.id} {...meme} />
      ))}
    </Scroll>
  );
};
