import { createContext, PropsWithChildren, useContext } from 'react';
import { MeeemorDeployAbi } from '@meeemor/backend';
import w3q from '../../../../../../contracts.w3q.json';
import hardhat from '../../../../../../contracts.hardhat.json';
import { useNetwork } from 'wagmi';

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
      address: '0x' as `0x${string}`,
      abi: MeeemorDeployAbi.abi,
    },
  },
};

const Context = createContext<ConfigProps>(initial);

export const Config: React.FC<PropsWithChildren> = (props) => {
  const { chain } = useNetwork();

  let address = '0x' as `0x${string}`;
  if (chain?.network === 'web3q-galileo') {
    address = w3q.meeemorDeploy as `0x${string}`;
  } else if (chain?.network === 'hardhat') {
    address = hardhat.meeemorDeploy as `0x${string}`;
  }
  console.log(chain?.network, 'network!');
  console.log(address);
  return (
    <Context.Provider
      value={{
        ...initial,
        contracts: { meeemor: { ...initial.contracts.meeemor, address } },
      }}
      {...props}
    />
  );
};

export const useConfig = () => useContext(Context);
