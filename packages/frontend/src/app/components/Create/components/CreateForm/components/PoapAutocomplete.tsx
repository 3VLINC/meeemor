import { Autocomplete, TextField } from '@mui/material';
import { FieldProps } from 'formik';
import { CreateProps } from '../CreateForm.interface';

const tempPoaps = [
  {
    id: 1,
    label: 'Eth Denver 2023',
  },
  {
    id: 2,
    label: 'DevCon 2023',
  },
];
interface Option {
  id: number;
  label: string;
}

export const PoapAutocomplete: React.FC<FieldProps<CreateProps>> = ({
  field: { name },
  form: { setFieldValue },
}) => {
  const handleSelect = (
    _: React.SyntheticEvent,
    selectedItem: Option | null
  ) => {
    // TODO:
    setFieldValue(name, selectedItem?.id);
  };

  return (
    <Autocomplete
      options={tempPoaps}
      onChange={handleSelect}
      renderInput={(params) => <TextField {...params} label="Select a POAP" />}
    />
  );
};
