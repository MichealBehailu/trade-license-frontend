import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import CustomerPortal from './pages/CustomerPortal';
import ReviewerPortal from './pages/ReviewerPortal';
import ApproverPortal from './pages/ApproverPortal';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<CustomerPortal />} />
        <Route path="/reviewer" element={<ReviewerPortal />} />
        <Route path="/approver" element={<ApproverPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;