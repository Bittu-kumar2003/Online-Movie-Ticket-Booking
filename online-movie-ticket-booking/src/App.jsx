import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import MovieDetails from './pages/MovieDetails';
// import Booking from './pages/Booking';
// import BookingHistory from './pages/BookingHistory';
// import Feedback from './pages/Feedback';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

const App = () => {
  return (
    <Router basename="/">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:showId" element={<Booking />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/feedback" element={<Feedback />} /> */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
