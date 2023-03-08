import { Autocomplete, TextField } from '@mui/material';
import { FieldProps } from 'formik';
import { useAllEvents } from '../../../../../../../hooks/useAllEvents';
import { useMocks } from '../../../../../../../shared/Mocks/Mocks';
import { useAccount } from 'wagmi';
import { CreateProps } from '../../../CreateForm.interface';

interface Option {
  id: number;
  label: string;
}

export const PoapAutocomplete: React.FC<FieldProps<CreateProps>> = ({
  field: { name },
  form: { setFieldValue },
}) => {
  const { address } = useAccount();
  const { data } = useAllEvents(address || '');
  const { eventName } = useMocks();
  const myActiveEvents = (data?.account?.tokens || []).map((token: any) => ({
    id: token.id,
    label: eventName(token.id),
  }));

  const handleSelect = (
    _: React.SyntheticEvent,
    selectedItem: Option | null
  ) => {
    // TODO:
    setFieldValue(name, selectedItem?.id);
  };

  return (
    <Autocomplete
      options={myActiveEvents}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ shrink: false }}
          label="Select your event POAP"
        />
      )}
    />
  );
};
