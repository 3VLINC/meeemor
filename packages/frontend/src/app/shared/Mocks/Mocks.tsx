import { intersectionBy } from 'lodash';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Option } from '../../app.interface';
import { oneDoesNot } from './images/oneDoesNot';

interface MocksProps {
  allEvents: Option[];
  myEvents: Option[];
  myActiveEvents: Option[];
  myPoaps: Option[];
  memes: (eventId: string) => Array<{
    id: string;
    votes: number;
    image: string;
  }>;
}

const initial: Omit<MocksProps, 'myActiveEvents'> = {
  allEvents: [
    {
      id: '1',
      label: 'Eth Denver',
    },
    {
      id: '2',
      label: 'DevCon',
    },
    {
      id: '3',
      label: 'ETHGlobal Toronto',
    },
    {
      id: '4',
      label: 'Permissionless',
    },
    {
      id: '5',
      label: 'SxSW',
    },
  ],
  myEvents: [
    {
      id: '1',
      label: 'Eth Denver',
    },
    {
      id: '3',
      label: 'ETHGlobal Toronto',
    },
    {
      id: '4',
      label: 'Permissionless',
    },
  ],
  myPoaps: [
    {
      id: '1',
      label: 'Eth Denver',
    },
    {
      id: '3',
      label: 'ETHGlobal Toronto',
    },
  ],
  memes: (eventId: string) => {
    switch (eventId) {
      default:
        return [
          {
            id: '1',
            votes: 0,
            image: oneDoesNot,
          },
          {
            id: '2',
            votes: 4,
            image: oneDoesNot,
          },
          {
            id: '3',
            votes: 19,
            image: oneDoesNot,
          },
          {
            id: '4',
            votes: 7,
            image: oneDoesNot,
          },
        ];
    }
  },
};

const Context = createContext<MocksProps>({ ...initial, myActiveEvents: [] });

export const Mocks: React.FC<PropsWithChildren> = (props) => {
  return (
    <Context.Provider
      value={{
        ...initial,
        myActiveEvents: intersectionBy(
          initial.myEvents,
          initial.allEvents,
          (o) => o.id
        ),
      }}
      {...props}
    />
  );
};

export const useMocks = () => useContext(Context);
