import { TextField, Autocomplete } from '@mui/material';
import { Option } from '../../../../app.interface';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useAllEvents } from '../../../../hooks/getAllEvents';
import { useMocks } from '../../../../shared/Mocks/Mocks';

export const FindEvent = () => {
  const navigate = useNavigate();
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
