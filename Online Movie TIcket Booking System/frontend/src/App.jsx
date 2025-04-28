import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FirstPage from './components/FirstPage';
import Booking from './pages/Booking';
import ErrorBoundary from './components/ErrorBoundary';
import Payment from './pages/Payment';
import SeatSelection from './pages/seatSelection';
import Confirmation from './pages/Confirmation';
import UserActivity from './pages/UserActivity';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* FirstPage as landing page */}
          <Route path="/" element={<FirstPage />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Main application routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/booking/:id" element={<Booking />} />
          
          {/* Optional: 404 page */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/useractivity" element={<UserActivity />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;