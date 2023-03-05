import { useQuery, gql } from '@apollo/client';

export const useEvent = (id: number) =>
  useQuery(
    gql`
      query getEvent($id: ID!) {
        token(id: $id) {
          id
        }
      }
    `,
    {
      variables: {
        id,
      },
      skip: !id,
    }
  );
