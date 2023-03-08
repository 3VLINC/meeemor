import { Field } from 'formik';
import { PoapAutocomplete } from './components/PoapAutocomplete';

export const ExistingPoap = () => {
  return <Field name="poapAddr" component={PoapAutocomplete} />;
};
