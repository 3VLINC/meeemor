import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { FileUpload } from './components/FileUpload/FileUpload';
import { SubmitProps } from './SubmitForm.interface';

const initialValues: SubmitProps = {
  ethStorageUrl: '',
  eventId: '',
};

export const SubmitForm = ({ eventId }: { eventId: string }) => {
  const handleSubmit = (values: SubmitProps) => {
    //TODO: submit to contract
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ ...initialValues, eventId }}
    >
      <Form>
        <Field name="ethStorageUrl" component={FileUpload} />
        {/* <Field name="bounty" component={BountyAmount} /> */}
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
};
