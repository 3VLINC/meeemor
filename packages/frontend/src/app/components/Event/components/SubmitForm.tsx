import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import { useMocks } from '../../../shared/Mocks/Mocks';
import { FileUpload } from './components/FileUpload/FileUpload';
import { SubmitProps } from './SubmitForm.interface';

const initialValues: SubmitProps = {
  ethStorageUrl: '',
  eventId: '',
};

export const SubmitForm = () => {
  const { eventId = '' } = useParams<{ eventId: string }>();

  const { myActiveEvents } = useMocks();

  const currentEvent = myActiveEvents.find(
    (event) => event.id === parseInt(eventId)
  );

  const handleSubmit = (values: SubmitProps) => {
    //TODO: submit to contract
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ ...initialValues, eventId }}
    >
      <Form>
        <h1>{currentEvent?.label}</h1>
        <Field name="ethStorageUrl" component={FileUpload} />
        {/* <Field name="bounty" component={BountyAmount} /> */}
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
};
