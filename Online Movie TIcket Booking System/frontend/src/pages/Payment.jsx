import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsCurrencyRupee } from 'react-icons/bs';
import { FaArrowLeft, FaCreditCard, FaMobileAlt, FaUniversity } from 'react-icons/fa';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    theater,
    movie,
    showtime,
    selectedSeats,
    totalPrice,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    contact: '',
  });

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.contact) {
      alert('Please fill all user details');
      return;
    }

    setIsProcessing(true);

    const options = {
      key: 'rzp_test_ll4TiwfGMLRf0y',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'Movie Booking App',
      description: `Booking for ${movie?.title}`,
      handler: async function (response) {
        const bookingData = {
          ...userDetails,
          movieTitle: movie?.title,
          theaterName: theater?.name,
          showtime,
          selectedSeats,
          totalPrice,
          paymentId: response.razorpay_payment_id,
          status: 'Confirmed',
        };

        await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
        });

        navigate('/confirmation', {
          state: {
            ...bookingData,
          },
        });
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.contact,
      },
      theme: {
        color: '#6C63FF',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setIsProcessing(false);
  };

  return (
    <div className="payment-page" style={styles.page}>
      <header className="payment-header" style={styles.header}>
        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
          style={styles.backButton}
        >
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back
        </button>
        <h2 style={styles.title}>Complete Your Payment</h2>
      </header>

      <div className="payment-container" style={styles.container}>
        <div className="payment-summary" style={styles.summary}>
          <h3 style={styles.movieTitle}>{movie?.title}</h3>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Theater:</span>
            <span>{theater?.name}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Showtime:</span>
            <span>{showtime}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Seats:</span>
            <span style={styles.seats}>{selectedSeats?.join(', ')}</span>
          </div>
          <div style={styles.totalAmount}>
            <span style={styles.detailLabel}>Total Amount:</span>
            <span style={styles.amount}>
              <BsCurrencyRupee style={{ verticalAlign: 'middle' }} /> 
              {totalPrice?.toFixed(0)}
            </span>
          </div>
        </div>

        <div className="user-details-form" style={styles.form}>
          <h4 style={styles.sectionTitle}>Your Information</h4>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Full Name</label>
            <input
              type="text"
              style={styles.input}
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Email</label>
            <input
              type="email"
              style={styles.input}
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Contact Number</label>
            <input
              type="tel"
              style={styles.input}
              value={userDetails.contact}
              onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="payment-methods" style={styles.paymentMethods}>
          <h4 style={styles.sectionTitle}>Payment Method</h4>
          <div style={styles.methodsContainer}>
            <div 
              style={{
                ...styles.methodOption,
                ...(paymentMethod === 'card' ? styles.activeMethod : {})
              }}
              onClick={() => setPaymentMethod('card')}
            >
              <FaCreditCard style={styles.methodIcon} />
              <span>Credit/Debit Card</span>
            </div>
            <div 
              style={{
                ...styles.methodOption,
                ...(paymentMethod === 'upi' ? styles.activeMethod : {})
              }}
              onClick={() => setPaymentMethod('upi')}
            >
              <FaMobileAlt style={styles.methodIcon} />
              <span>UPI</span>
            </div>
            <div 
              style={{
                ...styles.methodOption,
                ...(paymentMethod === 'netbanking' ? styles.activeMethod : {})
              }}
              onClick={() => setPaymentMethod('netbanking')}
            >
              <FaUniversity style={styles.methodIcon} />
              <span>Net Banking</span>
            </div>
          </div>
        </div>

        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={isProcessing}
          style={styles.payButton}
        >
          {isProcessing ? 'Processing...' : `Pay ₹${totalPrice}`}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    minWidth: '100vw',
    color: '#333',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    backgroundColor: '#6C63FF',
    padding: '20px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '20px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
  },
  container: {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  },
  summary: {
    backgroundColor: '#f0f2f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  movieTitle: {
    color: '#6C63FF',
    marginTop: 0,
    marginBottom: '15px',
    fontSize: '22px',
  },
  detailItem: {
    marginBottom: '10px',
    display: 'flex',
  },
  detailLabel: {
    fontWeight: '600',
    width: '120px',
    color: '#555',
  },
  seats: {
    fontWeight: '600',
    color: '#6C63FF',
  },
  totalAmount: {
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px dashed #ddd',
    display: 'flex',
    alignItems: 'center',
  },
  amount: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#6C63FF',
    marginLeft: '10px',
  },
  form: {
    marginBottom: '30px',
  },
  sectionTitle: {
    color: '#6C63FF',
    marginBottom: '20px',
    fontSize: '18px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  inputLabel: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border 0.3s',
  },
  inputFocus: {
    border: '1px solid #6C63FF',
    outline: 'none',
  },
  paymentMethods: {
    marginBottom: '30px',
  },
  methodsContainer: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  methodOption: {
    flex: '1',
    minWidth: '150px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  activeMethod: {
    border: '2px solid #6C63FF',
    backgroundColor: '#f0f0ff',
  },
  methodIcon: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#6C63FF',
  },
  payButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#6C63FF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  payButtonHover: {
    backgroundColor: '#5a52d6',
  },
  payButtonDisabled: {
    backgroundColor: '#aaa',
    cursor: 'not-allowed',
  },
};

export default Payment;