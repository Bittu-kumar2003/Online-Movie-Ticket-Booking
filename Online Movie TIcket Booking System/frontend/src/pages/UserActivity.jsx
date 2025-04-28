import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActivityPage.css';

const ActivityPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem('userEmail'); // Make sure this is set at login

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${userEmail}`);
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [userEmail]);

  return (
    <div className="activity-container">
      <h2>🎟️ My Ticket Activity</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="activity-table">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Theater</th>
              <th>Showtime</th>
              <th>Seats</th>
              <th>Total Price</th>
              <th>Booked At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={index}>
                <td>{b.movie}</td>
                <td>{b.theater}</td>
                <td>{b.showtime}</td>
                <td>{b.selectedSeats.join(', ')}</td>
                <td>₹{b.totalPrice}</td>
                <td>{new Date(b.bookedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityPage;
