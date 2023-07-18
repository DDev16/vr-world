import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './component/FrontPage/FrontPage.js';
import SeussWorld from './component/suessworld.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seussworld" element={<SeussWorld />} />
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </Router>
  );
}

export default App;