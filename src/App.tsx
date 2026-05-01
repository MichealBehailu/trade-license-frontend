import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from '../src/Pages/Home';
import CustomerPortal from '../src/Pages/CustomerPortal';
import ReviewerPortal from '../src/Pages/ReviewerPortal';
import ApproverPortal from '../src/Pages/ApproverPortal';
// import ApproverPortal from './pages/ApproverPortal';

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