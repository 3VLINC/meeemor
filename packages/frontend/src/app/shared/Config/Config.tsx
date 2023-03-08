import { createContext, PropsWithChildren, useContext } from 'react';
import { MeeemorDeployAbi } from '@meeemor/backend';
import contracts from '../../../../../../contracts.w3q.json';

interface ConfigProps {
  bounty: {
    min: number;
    max: number;
    stepIncrement: number;
    defaultValue: number;
  };
  contracts: {
    meeemor: {
      address: `0x${string}`;
      abi: (typeof MeeemorDeployAbi)['abi'];
    };
  };
}

const initial: ConfigProps = {
  bounty: {
    min: 1,
    max: 20,
    stepIncrement: 0.5,
    defaultValue: 3,
  },
  contracts: {
    meeemor: {
      address: contracts.meeemorDeploy as `0x${string}`,
      abi: MeeemorDeployAbi.abi,
    },
  },
};

const Context = createContext<ConfigProps>(initial);

export const Config: React.FC<PropsWithChildren> = (props) => {
  return <Context.Provider value={initial} {...props} />;
};

export const useConfig = () => useContext(Context);
