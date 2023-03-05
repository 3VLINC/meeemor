import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Chrome } from '../../shared/Chrome/Chrome';
import { MemeList } from './components/components/MemeList/MemeList';
import { SubmitForm } from './components/SubmitForm';
import { useEvent } from '../../hooks/useEvent';
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3rem;
`;
const MemeListWrap = styled.div`
  display: flex;
  flex: 1;
`;
const FormWrap = styled.div`
  flex: 1;
`;
export const Event = () => {
  const { eventId = '' } = useParams<{ eventId: string }>();

  const { data } = useEvent(parseInt(eventId));

  const currentEvent = data?.token;

  if (!currentEvent) {
    return null;
  }

  return (
    <Chrome>
      <Wrap>
        <MemeListWrap>
          <h1>{currentEvent?.label}</h1>
          <MemeList eventId={currentEvent.id} />
        </MemeListWrap>
        <FormWrap>
          <SubmitForm eventId={currentEvent.id} />
        </FormWrap>
      </Wrap>
    </Chrome>
  );
};
