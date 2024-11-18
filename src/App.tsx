import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import MainDashboard from './components/MainDashboard';
import CertificateDashboard from './components/CertificateDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<MainDashboard/>} />
        <Route path="/certificate" element={<CertificateDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;

