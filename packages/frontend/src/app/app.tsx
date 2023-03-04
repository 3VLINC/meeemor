import styled from 'styled-components';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Events } from './components/Events/Events';
import { Event } from './components/Event/Event';
import { Create } from './components/Create/Create';
import { Config } from './shared/Config/Config';
import { Web3 } from './shared/Web3/Web3';
import { Mocks } from './shared/Mocks/Mocks';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { GlobalStyles } from '@mui/material';
import { useAccount } from 'wagmi';

const client = new ApolloClient({
  uri: 'http://localhost:4200/api/subgraphs/name/3VLINC/poap-w3q-subgraph',
  cache: new InMemoryCache(),
});

const StyledApp = styled.div`
  // Your style here
`;

const AppRoutes = () => {
  const { isConnected } = useAccount();

  return isConnected ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:eventId" element={<Event />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export function App() {
  return (
    <StyledApp>
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#006683' },
        }}
      />
      <Config>
        <Web3>
          <ApolloProvider client={client}>
            <Mocks>
              <AppRoutes />
            </Mocks>
          </ApolloProvider>
        </Web3>
      </Config>
    </StyledApp>
  );
}

export default App;
