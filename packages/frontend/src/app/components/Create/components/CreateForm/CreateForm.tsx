import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { BountyAmount } from './components/BountyAmount';
import { PoapAutocomplete } from './components/PoapAutocomplete';
import { CreateProps } from './CreateForm.interface';
import styled from 'styled-components';
import { useConfig } from '../../../../shared/Config/Config';

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 640px;
`;

const StyledField = styled.div`
  margin: 2rem 0;
`;
const initialValues: CreateProps = {
  poapAddr: '',
  bounty: 0,
};

export const CreateForm = () => {
  const {
    bounty: { defaultValue },
  } = useConfig();
  const handleSubmit = (values: CreateProps) => {
    //TODO: submit to contract
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ ...initialValues, bounty: defaultValue }}
    >
      <StyledForm>
        <StyledField>
          <Field name="poapAddr" component={PoapAutocomplete} />
        </StyledField>
        <StyledField>
          <Field name="bounty" component={BountyAmount} />
        </StyledField>
        <Button type="submit">Submit</Button>
      </StyledForm>
    </Formik>
  );
};
