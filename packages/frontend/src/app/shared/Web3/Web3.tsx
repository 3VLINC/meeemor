import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { PropsWithChildren } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { config } from '../../app.config';

const {
  walletConnect: { chains, projectId },
} = config;

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId,
    version: '1', // or "2"
    appName: 'web3Modal',
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethClient = new EthereumClient(wagmiClient, chains);

export const Web3: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <WagmiConfig client={wagmiClient} children={children} />
      <Web3Modal projectId={projectId} ethereumClient={ethClient} />
    </>
  );
};
