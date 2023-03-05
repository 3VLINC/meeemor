import { useQuery, gql } from '@apollo/client';
import { ethers } from 'ethers';
export const useAllEvents = (address: string) =>
  useQuery(
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
