import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Submit } from './components/Submit/Submit';
import { Events } from './components/Events/Events';
import { Event } from './components/Event/Event';
import { Create } from './components/Create/Create';
import { Config } from './shared/Config/Config';
import { Web3 } from './shared/Web3/Web3';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Config>
        <Web3>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/event/:id/submit" element={<Submit />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </Web3>
      </Config>
    </StyledApp>
  );
}

export default App;
