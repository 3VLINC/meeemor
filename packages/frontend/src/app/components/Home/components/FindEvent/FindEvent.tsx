import { TextField, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Option {
  id: number;
  label: string;
}
const tempEvents: Option[] = [
  {
    id: 1,
    label: 'Eth Denver',
  },
  {
    id: 2,
    label: 'DevCon',
  },
  {
    id: 3,
    label: 'ETHGlobal Toronto',
  },
  {
    id: 4,
    label: 'Permissionless',
  },
  {
    id: 5,
    label: 'SxSW',
  },
];
export const FindEvent = () => {
  const navigate = useNavigate();
  const handleSelect = (
    _: React.SyntheticEvent,
    selectedItem: Option | null
  ) => {
    if (!selectedItem) return;
    navigate(`/event/${selectedItem.id}`);
  };

  return (
    <Autocomplete
      options={tempEvents}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField {...params} label="Select an event" />
      )}
    />
  );
};
