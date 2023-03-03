import styled from 'styled-components';
import { Route, Routes, Link } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Submit } from './components/Submit/Submit';
import { Events } from './components/Events/Events';
import { Event } from './components/Event/Event';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/events"
          element={<Events />}
        />
        <Route
          path="/events/:id"
          element={<Event />}
        />
        <Route
          path="/events/:id/submit"
          element={<Submit />}
        />
      </Routes>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
