import styled from 'styled-components';
import { useMocks } from '../../../../../shared/Mocks/Mocks';

const Image = styled.img`
  height: 120px;
  width: auto;
  display: block;
`;
export const MemeList = ({ eventId }: { eventId: string }) => {
  const { memes } = useMocks();

  const memesForEvent = memes(eventId);

  return (
    <div>
      {memesForEvent.map((meme) => (
        <div key={meme.id}>
          <Image alt="" height="120px" width="auto" src={meme.image} />
          <div>{meme.votes}</div>
        </div>
      ))}
    </div>
  );
};
