import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './component/FrontPage/FrontPage.js';
import SeussWorld from './component/suessworld.js';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<FrontPage />} />
        <Route path="/" element={<SeussWorld />} />
      </Routes>
    </Router>
  );
}

export default App;