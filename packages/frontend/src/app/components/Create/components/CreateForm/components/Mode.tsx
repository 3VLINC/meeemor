import { Radio } from '@mui/material';
import { FieldProps } from 'formik';

export const Mode = ({
  form: { values },
  field: { name, value, ...props },
}: FieldProps) => {
  return (
    <Radio
      name={name}
      value={value}
      checked={value === values[name]}
      {...props}
    />
  );
};
