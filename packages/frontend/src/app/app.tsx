import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Events } from './components/Events/Events';
import { Event } from './components/Event/Event';
import { Create } from './components/Create/Create';
import { Config } from './shared/Config/Config';
import { Web3 } from './shared/Web3/Web3';
import { Mocks } from './shared/Mocks/Mocks';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Config>
        <Web3>
          <Mocks>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:eventId" element={<Event />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Mocks>
        </Web3>
      </Config>
    </StyledApp>
  );
}

export default App;
