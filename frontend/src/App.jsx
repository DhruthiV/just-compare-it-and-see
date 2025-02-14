import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ComparisonPage from './pages/ComparisonPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comparison" element={<ComparisonPage />} />
    </Routes>
  );
}

export default App;
