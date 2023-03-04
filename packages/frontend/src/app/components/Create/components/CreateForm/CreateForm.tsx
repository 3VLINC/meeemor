import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { BountyAmount } from './components/BountyAmount';
import { PoapAutocomplete } from './components/PoapAutocomplete';
import { CreateProps } from './CreateForm.interface';

const initialValues: CreateProps = {
  poapAddr: '',
  bounty: 0,
};

export const CreateForm = () => {
  const handleSubmit = (values: CreateProps) => {
    //TODO: submit to contract
    console.log(values);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form>
        <Field name="poapAddr" component={PoapAutocomplete} />
        <Field name="bounty" component={BountyAmount} />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
};
