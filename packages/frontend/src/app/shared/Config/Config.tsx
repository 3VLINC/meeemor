import { createContext, PropsWithChildren, useContext } from 'react';

interface ConfigProps {
  bounty: {
    min: number;
    max: number;
    stepIncrement: number;
    defaultValue: number;
  };
}

const initial: ConfigProps = {
  bounty: {
    min: 1,
    max: 20,
    stepIncrement: 0.5,
    defaultValue: 3,
  },
};

const Context = createContext<ConfigProps>(initial);

export const Config: React.FC<PropsWithChildren> = (props) => {
  return <Context.Provider value={initial} {...props} />;
};

export const useConfig = () => useContext(Context);
