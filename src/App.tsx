import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material"; // Material-UI imports
import Navbar from "./components/Navbar";

import CertificateDashboard from "./components/CertificateDashboard";
import MainDashboard from "./components/MainDashboard";
import theme from "./theme/theme"; // Import the custom theme

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styling across browsers */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/certificate" element={<CertificateDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;



