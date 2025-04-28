
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaChair, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { BsCurrencyRupee } from 'react-icons/bs';

function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theater, movie, showtime } = location.state || {};
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dynamicPrice, setDynamicPrice] = useState(theater?.price || 200);
  const [isLoading, setIsLoading] = useState(true);

  // Create a theater layout (5 rows x 10 seats)
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  // Simulate some occupied seats (in a real app, this would come from an API)
  const occupiedSeats = ['A3', 'A4', 'B7', 'C1', 'C2', 'D5', 'D6', 'E9', 'E10'];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Calculate dynamic pricing based on showtime
    if (showtime) {
      const hour = parseInt(showtime.split(':')[0]);
      if (hour >= 18) { // Evening shows more expensive
        setDynamicPrice(theater.price * 1.2);
      } else if (hour >= 12) { // Afternoon shows
        setDynamicPrice(theater.price * 1.1);
      } else { // Morning shows
        setDynamicPrice(theater.price * 0.9);
      }
    }

    return () => clearTimeout(timer);
  }, [showtime, theater]);

  const toggleSeatSelection = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
      setTotalPrice(prev => prev - dynamicPrice);
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      setTotalPrice(prev => prev + dynamicPrice);
    }
  };

  const handleProceedToPayment = () => {
    navigate('/payment', {
      state: {
        theater,
        movie,
        showtime,
        selectedSeats,
        totalPrice,
        dynamicPrice
      }
    });
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading seat map...</p>
      </div>
    );
  }

  return (
    <div className="seat-selection-page">
      {/* Navigation */}
      <header className="seat-selection-header">
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Home
        </Link>
        <div className="header-logo">
          <span>MovieVerse</span>
        </div>
      </header>

      <div className="seat-selection-container">
        <div className="booking-info">
          <h1 className="movie-title">{movie?.title}</h1>
          <div className="theater-info">
            <h2>{theater?.name}</h2>
            <p className="theater-location">{theater?.location}</p>
            <div className="showtime-price-container">
              <p className="showtime-info">
                <strong>Showtime:</strong> {showtime}
              </p>
              <p className="price-info">
                <strong>Price:</strong> <BsCurrencyRupee /> {dynamicPrice.toFixed(0)}
                {dynamicPrice !== theater?.price && (
                  <span className="original-price"> (Normally <BsCurrencyRupee />{theater?.price})</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 3D Screen Design */}
        <div className="screen-container">
          <div className="screen-3d">
            <div className="screen-content">SCREEN</div>
            <div className="screen-reflection"></div>
          </div>
          <div className="screen-base"></div>
        </div>

        <div className="seat-map">
          {rows.map(row => (
            <div key={row} className="seat-row">
              <div className="row-label">{row}</div>
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNumber = i + 1;
                const seatId = `${row}${seatNumber}`;
                const isSelected = selectedSeats.includes(seatId);
                const isOccupied = occupiedSeats.includes(seatId);
                
                return (
                  <button
                    key={seatId}
                    className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                    onClick={() => toggleSeatSelection(seatId)}
                    disabled={isOccupied}
                  >
                    <FaChair />
                    {isSelected && <span className="check-mark"><FaCheck /></span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="seat-legend">
          <div className="legend-item">
            <span className="seat available"><FaChair /></span>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <span className="seat selected"><FaChair /></span>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <span className="seat occupied"><FaChair /></span>
            <span>Occupied</span>
          </div>
          <div className="legend-item">
            <span className="seat premium"><FaChair /></span>
            <span>Premium (+20%)</span>
          </div>
        </div>

        <div className="booking-summary">
          <div className="summary-details">
            <h3>Booking Summary</h3>
            <div className="seats-selected">
              <strong>Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
            </div>
            <div className="price-details">
              <div className="price-row">
                <span>Tickets ({selectedSeats.length}):</span>
                <span><BsCurrencyRupee /> {(dynamicPrice * selectedSeats.length).toFixed(0)}</span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span className="total-price">
                  <BsCurrencyRupee /> {totalPrice.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
          <button
            className="proceed-button"
            onClick={handleProceedToPayment}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;

// Add these styles to your stylesheet
const seatSelectionStyles = `
.seat-selection-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Poppins', sans-serif;
  background: #f8f9fa;
  min-height: 100vh;
  min-width: 97vw;
}

.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(229, 9, 20, 0.2);
  border-radius: 50%;
  border-top-color: #e50914;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.seat-selection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 30px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e50914;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  background: rgba(229, 9, 20, 0.1);
  padding: 8px 15px;
  border-radius: 5px;
}

.back-button:hover {
  color: #fff;
  background: #e50914;
}

.header-logo {
  font-size: 24px;
  font-weight: bold;
  color: #e50914;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.seat-selection-container {
  background: #fff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.booking-info {
  margin-bottom: 30px;
  text-align: center;
}

.movie-title {
  color: #212529;
  margin-bottom: 10px;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.theater-info {
  color: #495057;
}

.theater-info h2 {
  font-size: 1.5rem;
  color: #212529;
  margin-bottom: 5px;
}

.theater-location {
  color: #6c757d;
  margin-bottom: 15px;
}

.showtime-price-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 15px;
}

.showtime-info {
  font-size: 1.1rem;
  color: #e50914;
  font-weight: 500;
}

.price-info {
  font-size: 1.1rem;
  color: #28a745;
  font-weight: 500;
}

.original-price {
  font-size: 0.9rem;
  color: #6c757d;
  text-decoration: line-through;
}

/* 3D Screen Design */
.screen-container {
  perspective: 1000px;
  margin: 0 auto 40px;
  width: 80%;
  max-width: 800px;
}

.screen-3d {
  position: relative;
  height: 80px;
  background: linear-gradient(to bottom, #333, #222);
  color: white;
  text-align: center;
  padding: 15px;
  border-radius: 5px 5px 0 0;
  transform: rotateX(40deg);
  transform-origin: bottom;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
}

.screen-content {
  position: relative;
  z-index: 2;
  font-weight: bold;
  letter-spacing: 3px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.screen-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  border-radius: 5px 5px 0 0;
}

.screen-base {
  height: 15px;
  background: #555;
  border-radius: 0 0 5px 5px;
  width: 90%;
  margin: 0 auto;
}

.seat-map {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.seat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.row-label {
  width: 20px;
  font-weight: bold;
  color: #495057;
}

.seat {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f3f5;
  border: none;
  border-radius: 8px 8px 3px 3px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #868e96;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

.seat:hover {
  background: #dee2e6;
  transform: translateY(-2px);
}

.seat.selected {
  background: #e50914;
  color: white;
  box-shadow: 0 5px 10px rgba(229, 9, 20, 0.3);
}

.seat.occupied {
  background: #adb5bd;
  color: #495057;
  cursor: not-allowed;
  box-shadow: none;
}

.seat.premium {
  background: #ffc107;
  color: #212529;
}

.check-mark {
  position: absolute;
  font-size: 0.8rem;
  color: white;
}

.seat-legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #495057;
}

.legend-item .seat {
  cursor: default;
  width: 25px;
  height: 25px;
}

.legend-item .seat:hover {
  transform: none;
}

.booking-summary {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.summary-details {
  flex: 1;
  min-width: 250px;
}

.summary-details h3 {
  margin-bottom: 15px;
  color: #212529;
  font-size: 1.3rem;
}

.seats-selected {
  margin-bottom: 15px;
  color: #495057;
}

.price-details {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.price-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #495057;
}

.price-row.total {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #dee2e6;
  font-weight: 600;
  color: #212529;
}

.total-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e50914;
  display: flex;
  align-items: center;
  gap: 5px;
}

.proceed-button {
  padding: 15px 40px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(229, 9, 20, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.proceed-button:hover {
  background: #b2070f;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(229, 9, 20, 0.4);
}

.proceed-button:disabled {
  background: #adb5bd;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .seat-selection-container {
    padding: 20px;
  }
  
  .movie-title {
    font-size: 1.8rem;
  }
  
  .showtime-price-container {
    flex-direction: column;
    gap: 10px;
  }
  
  .seat-row {
    gap: 5px;
  }
  
  .seat {
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
  }
  
  .screen-3d {
    height: 60px;
    padding: 10px;
  }
  
  .proceed-button {
    width: 100%;
    padding: 15px;
  }
}
`;

// Add styles to the document
const seatStyleSheet = document.createElement("style");
seatStyleSheet.type = "text/css";
seatStyleSheet.innerText = seatSelectionStyles;
document.head.appendChild(seatStyleSheet);


// import React, { useState } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { FaChair, FaArrowLeft, FaCheck } from 'react-icons/fa';
// import { BsCurrencyRupee } from 'react-icons/bs';

// function SeatSelection() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { theater, movie, showtime, date, location: theaterLocation } = location.state || {};
  
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Create a theater layout (5 rows x 10 seats)
//   const rows = ['A', 'B', 'C', 'D', 'E'];
//   const seatsPerRow = 10;
//   const [occupiedSeats] = useState(['A3', 'A4', 'B7', 'C1', 'C2', 'D5', 'D6', 'E9', 'E10']);

//   const toggleSeatSelection = (seatId) => {
//     if (occupiedSeats.includes(seatId)) return;
    
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seatId));
//       setTotalPrice(totalPrice - theater.price);
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//       setTotalPrice(totalPrice + theater.price);
//     }
//   };

//   const handleProceedToPayment = () => {
//     if (selectedSeats.length === 0) {
//       alert('Please select at least one seat');
//       return;
//     }

//     navigate('/payment', {
//       state: {
//         theater,
//         movie,
//         showtime,
//         date,
//         location: theaterLocation,
//         selectedSeats,
//         totalPrice
//       }
//     });
//   };

//   return (
//     <div>
//       <header>
//         <Link to="/" className="back-button">
//           <FaArrowLeft /> Back to Home
//         </Link>
//         <div>
//           <span>CineVerse</span>
//         </div>
//       </header>

//       <div>
//         <div>
//           <h1>{movie?.title}</h1>
//           <div>
//             <h2>{theater?.name}</h2>
//             <p>{theater?.location}</p>
//             <p>
//               <strong>Date:</strong> {date}
//             </p>
//             <p>
//               <strong>Showtime:</strong> {showtime}
//             </p>
//           </div>
//         </div>

//         <div>SCREEN</div>

//         <div>
//           {rows.map(row => (
//             <div key={row}>
//               <div>{row}</div>
//               {Array.from({ length: seatsPerRow }, (_, i) => {
//                 const seatNumber = i + 1;
//                 const seatId = `${row}${seatNumber}`;
//                 const isSelected = selectedSeats.includes(seatId);
//                 const isOccupied = occupiedSeats.includes(seatId);
                
//                 return (
//                   <button
//                     key={seatId}
//                     onClick={() => toggleSeatSelection(seatId)}
//                     disabled={isOccupied}
//                   >
//                     <FaChair />
//                     {isSelected && <span><FaCheck /></span>}
//                   </button>
//                 );
//               })}
//             </div>
//           ))}
//         </div>

//         <div>
//           <div>
//             <span><FaChair /></span>
//             <span>Available</span>
//           </div>
//           <div>
//             <span><FaChair /></span>
//             <span>Selected</span>
//           </div>
//           <div>
//             <span><FaChair /></span>
//             <span>Occupied</span>
//           </div>
//         </div>

//         <div>
//           <div>
//             <h3>Booking Summary</h3>
//             <p>Seats: {selectedSeats.join(', ')}</p>
//             <p>
//               <BsCurrencyRupee /> {totalPrice}
//             </p>
//           </div>
//           <button
//             onClick={handleProceedToPayment}
//             disabled={selectedSeats.length === 0}
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SeatSelection;