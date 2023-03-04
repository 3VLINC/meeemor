import { TextField, Autocomplete } from '@mui/material';
import { useMocks } from '../../../../shared/Mocks/Mocks';
import { Option } from '../../../../app.interface';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
export const FindEvent = () => {
  const navigate = useNavigate();
  const { address } = useAccount();

  const { data } = useQuery(
    gql`
      query getAllEvents($id: ID!) {
        account(id: $id) {
          tokens(orderBy: created, orderDirection: desc) {
            id
            event {
              id
            }
            created
          }
        }
      }
    `,
    {
      variables: {
        id: address?.toLowerCase(),
      },
      skip: address === ethers.constants.AddressZero,
    }
  );

  console.log(data);

  const myActiveEvents = (data?.account?.tokens || []).map((token: any) => ({
    id: token.id,
    label: token.id,
  }));
  // const { myActiveEvents } = useMocks();
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
