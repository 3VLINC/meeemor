import styled from 'styled-components';
import { Chrome } from '../../shared/Chrome/Chrome';
import { CreateForm } from './components/CreateForm/CreateForm';

const Wrapper = styled.div`
  flex: 1;
  padding: 50px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Create = () => {
  return (
    <Chrome>
      <Wrapper>
        <CreateForm />
      </Wrapper>
    </Chrome>
  );
};
