import { intersection, intersectionBy } from 'lodash';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Option } from '../../app.interface';

interface MocksProps {
  allEvents: Option[];
  myEvents: Option[];
  myActiveEvents: Option[];
  myPoaps: Option[];
}

const initial: Omit<MocksProps, 'myActiveEvents'> = {
  allEvents: [
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
  ],
  myEvents: [
    {
      id: 1,
      label: 'Eth Denver',
    },
    {
      id: 3,
      label: 'ETHGlobal Toronto',
    },
    {
      id: 4,
      label: 'Permissionless',
    },
  ],
  myPoaps: [
    {
      id: 1,
      label: 'Eth Denver',
    },
    {
      id: 3,
      label: 'ETHGlobal Toronto',
    },
  ],
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
