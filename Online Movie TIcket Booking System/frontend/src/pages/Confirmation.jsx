import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsCurrencyRupee, BsCheckCircleFill } from 'react-icons/bs';
import { FaHome, FaTicketAlt, FaEnvelope } from 'react-icons/fa';

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    movie,
    theater,
    showtime,
    selectedSeats,
    totalPrice,
    paymentId,
    name,
    email
  } = location.state || {};

  useEffect(() => {
    // Send confirmation email with ticket PDF
    const sendConfirmation = async () => {
      try {
        await axios.post('http://localhost:5000/api/send-confirmation', {
          email: email,
          userName: name,
          movie: movie?.title,
          theater: theater?.name,
          showtime,
          selectedSeats,
          totalPrice,
          paymentId,
        });
        console.log('✅ Email sent!');
      } catch (error) {
        console.error('❌ Error sending confirmation:', error);
      }
    };

    sendConfirmation();
  }, [email, name, movie, theater, showtime, selectedSeats, totalPrice, paymentId]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.successIcon}>
          <BsCheckCircleFill style={{ fontSize: '80px', color: '#4CAF50' }} />
        </div>
        
        <h1 style={styles.title}>Booking Confirmed!</h1>
        <p style={styles.subtitle}>Your tickets have been booked successfully</p>
        
        <div style={styles.ticketCard}>
          <div style={styles.ticketHeader}>
            <h3 style={styles.movieTitle}>{movie?.title}</h3>
            <div style={styles.ticketBadge}>
              <FaTicketAlt style={{ marginRight: '5px' }} />
              E-Ticket
            </div>
          </div>
          
          <div style={styles.detailsGrid}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Theater:</span>
              <span style={styles.detailValue}>{theater?.name}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Showtime:</span>
              <span style={styles.detailValue}>{showtime}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Seats:</span>
              <span style={{ ...styles.detailValue, color: '#FF5722' }}>
                {selectedSeats?.join(', ')}
              </span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Total Paid:</span>
              <span style={{ ...styles.detailValue, fontWeight: 'bold' }}>
                <BsCurrencyRupee style={{ verticalAlign: 'middle' }} />
                {totalPrice?.toFixed(0)}
              </span>
            </div>
          </div>
          
          <div style={styles.paymentInfo}>
            <span style={styles.detailLabel}>Payment ID:</span>
            <span style={styles.paymentId}>{paymentId}</span>
          </div>
        </div>
        
        <div style={styles.emailNotification}>
          <FaEnvelope style={{ fontSize: '24px', color: '#2196F3', marginRight: '10px' }} />
          <span>Your e-ticket has been sent to <strong>{email}</strong></span>
        </div>
        
        <div style={styles.buttonGroup}>
          <button 
            style={styles.primaryButton}
            onClick={() => navigate('/')}
          >
            <FaHome style={{ marginRight: '8px' }} />
            Back to Home
          </button>
          <button 
            style={styles.secondaryButton}
            onClick={() => window.print()}
          >
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    padding: '40px',
    maxWidth: '700px',
    width: '100%',
    textAlign: 'center',
  },
  successIcon: {
    marginBottom: '20px',
  },
  title: {
    color: '#2E7D32',
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#555',
    fontSize: '18px',
    marginBottom: '30px',
  },
  ticketCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '30px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
  },
  movieTitle: {
    color: '#333',
    fontSize: '24px',
    margin: 0,
  },
  ticketBadge: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px',
  },
  detailItem: {
    marginBottom: '15px',
  },
  detailLabel: {
    display: 'block',
    color: '#666',
    fontSize: '14px',
    marginBottom: '5px',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: '16px',
    color: '#333',
  },
  paymentInfo: {
    backgroundColor: '#f0f4f8',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '20px',
  },
  paymentId: {
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#555',
    wordBreak: 'break-all',
  },
  emailNotification: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '30px',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s',
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#2E7D32',
    border: '1px solid #2E7D32',
    padding: '12px 25px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

export default Confirmation;