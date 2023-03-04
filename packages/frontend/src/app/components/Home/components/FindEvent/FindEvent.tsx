import { TextField, Autocomplete } from '@mui/material';
import { useMocks } from '../../../../shared/Mocks/Mocks';
import { Option } from '../../../../app.interface';
import { useNavigate } from 'react-router-dom';

export const FindEvent = () => {
  const navigate = useNavigate();
  const { myActiveEvents } = useMocks();
  const handleSelect = (
    _: React.SyntheticEvent,
    selectedItem: Option | null
  ) => {
    if (!selectedItem) return;
    navigate(`/event/${selectedItem.id}`);
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
