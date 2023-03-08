import { Input } from '@mui/material';
import { Field, FieldProps } from 'formik';
import styled from 'styled-components';
import { CreateProps } from '../CreateForm.interface';

const StyledField = styled.div`
  margin: 2rem 0;
`;

const EventName = ({ field }: FieldProps<CreateProps>) => (
  <Input
    {...field}
    fullWidth={true}
    title="Event Name"
    placeholder="Event Name"
    disableUnderline={true}
  />
);
export const NewPoap = () => {
  return (
    <StyledField>
      <Field name="eventName" component={EventName} />
    </StyledField>
  );
};
