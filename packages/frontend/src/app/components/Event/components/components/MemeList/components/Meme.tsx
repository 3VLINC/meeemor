import styled from 'styled-components';

const Wrap = styled.div`
  padding: 1rem;
`;
const Image = styled.img`
  height: 120px;
  width: auto;
  display: block;
`;

export const Meme = ({
  id,
  votes,
  image,
}: {
  id: string;
  votes: number;
  image: string;
}) => (
  <Wrap>
    <Image alt="" height="120px" width="auto" src={image} />
    <div>{votes}</div>
  </Wrap>
);
