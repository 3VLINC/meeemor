import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Submit } from './components/Submit/Submit';
import { Events } from './components/Events/Events';
import { Event } from './components/Event/Event';
import { Create } from './components/Create/Create';
import { Config } from './shared/Config/Config';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Config>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/event/:id/submit" element={<Submit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Config>
    </StyledApp>
  );
}

export default App;
