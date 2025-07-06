import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ItineraryDetail from './components/ItineraryDetail';
import AgentDetail from './components/AgentDetail';
import AgentLogin from './components/AgentLogin';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import HowItWorks from './components/HowItWorks';
import CustomerLogin from './components/CustomerLogin';
import CustomerSignup from './components/CustomerSignup';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itinerary/:id" element={<ItineraryDetail />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
          <Route path="/agentlogin" element={<AgentLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/terms" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Terms of Service</h1></div>} />
          <Route path="/privacy" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Privacy Policy</h1></div>} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/signup" element={<CustomerSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 