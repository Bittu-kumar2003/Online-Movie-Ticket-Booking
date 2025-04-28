import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, 
  FaChair, FaPlay, FaArrowLeft, FaHeart,
  FaFacebook, FaTwitter, FaInstagram, FaYoutube
} from 'react-icons/fa';
import { MdLocalMovies, MdTheaters, MdOutlineConfirmationNumber, MdOutlineMovie } from 'react-icons/md';
import { IoMdTime, IoMdPeople } from 'react-icons/io';
import { BsCurrencyRupee, BsFillPersonFill, BsTicketDetailed } from 'react-icons/bs';
import { FiAward } from 'react-icons/fi';
import './Booking.css';

// const API_KEY = '4b64c817b80e0c6f8e5fe98bb3e6393c';
const API_KEY = '46eaaffca8e87e387f2df72410ec8d3c';


function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const locations = [
    { id: 'delhi', name: 'Delhi', icon: '🏙️' },
    { id: 'mumbai', name: 'Mumbai', icon: '🌊' },
    { id: 'bangalore', name: 'Bangalore', icon: '🌆' },
    { id: 'hyderabad', name: 'Hyderabad', icon: '🏰' },
    { id: 'kolkata', name: 'Kolkata', icon: '🌉' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(movieResponse.data);

        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const trailer = videosResponse.data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        setCast(creditsResponse.data.cast.slice(0, 6));

        const mockTheaters = [
          {
            id: 1,
            name: 'PVR Cinemas',
            location: 'Delhi',
            showtimes: ['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM'],
            price: 250,
            seats: 120,
            amenities: ['Dolby Atmos', 'Recliner Seats', 'Food Court'],
            logo: 'https://via.placeholder.com/100x30?text=PVR',
            image: 'https://source.unsplash.com/random/800x600/?cinema,theater'
          },
          {
            id: 2,
            name: 'INOX Movies',
            location: 'Mumbai',
            showtimes: ['11:00 AM', '2:30 PM', '5:45 PM', '9:00 PM'],
            price: 300,
            seats: 80,
            amenities: ['IMAX', '3D', 'Cafe'],
            logo: 'https://via.placeholder.com/100x30?text=INOX',
            image: 'https://source.unsplash.com/random/800x600/?movie,theater'
          },
          {
            id: 3,
            name: 'Cinepolis',
            location: 'Bangalore',
            showtimes: ['9:30 AM', '12:45 PM', '4:00 PM', '7:15 PM'],
            price: 350,
            seats: 150,
            amenities: ['4DX', 'VIP Lounge', 'Bar'],
            logo: 'https://via.placeholder.com/100x30?text=Cinepolis',
            image: 'https://source.unsplash.com/random/800x600/?luxury,theater'
          }
        ];
        
        setTheaters(mockTheaters);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const filteredTheaters = selectedLocation 
    ? theaters.filter(theater => theater.location === selectedLocation)
    : theaters;

  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handleTimeSelection = (theater, time) => {
    setSelectedTheater(theater);
    setSelectedTime(time);
  };

  const handleProceedToBooking = () => {
    if (!selectedLocation || !selectedDate || !selectedTime || !selectedTheater) {
      alert('Please select location, date, time, and theater before proceeding');
      return;
    }

    navigate('/seat-selection', {
      state: {
        movie,
        theater: selectedTheater,
        showtime: selectedTime,
        date: selectedDate,
        location: selectedLocation
      }
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading cinematic magic...</p>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="back-link">
            <FaArrowLeft className="back-icon" /> Back to Home
          </Link>
          <div className="logo">
            <MdLocalMovies className="logo-icon" />
            <span className="logo-part1">Movie</span><span className="logo-part2">Verse</span>
          </div>
          <div className="auth-buttons">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
            >
              <FaHeart />
            </button>
            <Link to="/login" className="login-button">Contact</Link>
            <Link to="/register" className="register-button">Rating</Link>
          </div>
        </div>
      </header>

      {movie && (
        <main className="main-content">
          <section className="movie-hero">
            <div className="hero-overlay"></div>
            <img 
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
              alt={movie.title}
              className="hero-image"
            />
            <div className="hero-content">
              <h1 className="movie-title">{movie.title}</h1>
              <div className="movie-meta">
                <span className="meta-item rating">
                  <FaStar className="meta-icon" /> {movie.vote_average.toFixed(1)}/10
                </span>
                <span className="meta-item runtime">
                  <IoMdTime className="meta-icon" /> {movie.runtime} mins
                </span>
                <span className="meta-item status">
                  <FiAward className="meta-icon" /> {movie.status}
                </span>
                <span className="meta-item release-date">
                  <MdOutlineMovie className="meta-icon" />
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </section>

          <section className="movie-details">
            <div className="poster-container">
              <div className="poster-wrapper">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  className="movie-poster"
                />
                {trailerKey && (
                  <a 
                    href={`https://www.youtube.com/watch?v=${trailerKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trailer-link"
                  >
                    <div className="play-button">
                      <FaPlay className="play-icon" />
                    </div>
                  </a>
                )}
              </div>
            </div>
            
            <div className="movie-info">
              <div className="genre-tags">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    <BsTicketDetailed className="genre-icon" /> {genre.name}
                  </span>
                ))}
              </div>

              <h3 className="section-title">Storyline</h3>
              <p className="movie-overview">{movie.overview}</p>
              
              <div className="movie-facts">
                <div className="fact-card">
                  <h4 className="fact-title">
                    <FiAward className="fact-icon" /> Status
                  </h4>
                  <p className="fact-value">{movie.status}</p>
                </div>
                <div className="fact-card">
                  <h4 className="fact-title">
                    <IoMdTime className="fact-icon" /> Runtime
                  </h4>
                  <p className="fact-value">{movie.runtime} minutes</p>
                </div>
                <div className="fact-card">
                  <h4 className="fact-title">
                    <MdOutlineMovie className="fact-icon" /> Release Date
                  </h4>
                  <p className="fact-value">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="fact-card">
                  <h4 className="fact-title">
                    <FaStar className="fact-icon" /> Rating
                  </h4>
                  <p className="fact-value">{movie.vote_average.toFixed(1)}/10 ({movie.vote_count.toLocaleString()} votes)</p>
                </div>
              </div>
            </div>
          </section>

          {trailerKey && (
            <section className="trailer-section">
              <h2 className="section-title">
                <FaPlay className="section-icon" /> Official Trailer
              </h2>
              <div className="trailer-container">
                <iframe 
                  className="trailer-iframe"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

          <section className="cast-section">
            <h2 className="section-title">
              <IoMdPeople className="section-icon" /> Cast
            </h2>
            <div className="cast-grid">
              {cast.map(person => (
                <div key={person.id} className="cast-member">
                  <div className="cast-image-container">
                    <img 
                      src={person.profile_path 
                        ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Image'}
                      alt={person.name}
                      className="cast-image"
                    />
                    <div className="cast-character">
                      <p className="character-name">as {person.character}</p>
                    </div>
                  </div>
                  <h4 className="cast-name">{person.name}</h4>
                </div>
              ))}
            </div>
          </section>

          <section className="booking-section">
            <div className="booking-header">
              <h2 className="booking-title">
                <MdOutlineConfirmationNumber className="booking-icon" /> Book Tickets
              </h2>
              <p className="booking-subtitle">Select your preferred location, date and time</p>
            </div>

            <div className="booking-filters">
              <div className="filter-card">
                <label className="filter-label">
                  <FaMapMarkerAlt className="filter-icon" /> Location
                </label>
                <select 
                  value={selectedLocation} 
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setSelectedTheater(null);
                    setSelectedTime('');
                  }}
                  className="location-select"
                >
                  <option value="">Select Location</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.name}>
                      {loc.icon} {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-card">
                <label className="filter-label">
                  <FaCalendarAlt className="filter-icon" /> Date
                </label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  max={nextWeek}
                  className="date-input"
                />
              </div>
            </div>

            <div className="theaters-list">
              {filteredTheaters.length > 0 ? (
                filteredTheaters.map(theater => (
                  <div 
                    key={theater.id} 
                    className={`theater-card ${selectedTheater?.id === theater.id ? 'selected' : ''}`}
                  >
                    <div className="theater-header">
                      <div className="theater-info">
                        <div className="theater-name-container">
                          {theater.logo && (
                            <img src={theater.logo} alt={theater.name} className="theater-logo" />
                          )}
                          <h3 className="theater-name">{theater.name}</h3>
                        </div>
                        <div className="theater-meta">
                          <span className="theater-location">
                            <FaMapMarkerAlt className="meta-icon" /> {theater.location}
                          </span>
                          <span className="theater-seats">
                            <FaChair className="meta-icon" /> {theater.seats} seats
                          </span>
                        </div>
                      </div>
                      <div className="theater-price">
                        <BsCurrencyRupee className="price-icon" /> {theater.price}
                        <span className="price-label">/ ticket</span>
                      </div>
                    </div>

                    <div className="theater-details">
                      <div className="theater-amenities">
                        {theater.amenities.map((amenity, index) => (
                          <span key={index} className="amenity-tag">
                            <span className="amenity-bullet"></span>
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="showtimes-container">
                        <h4 className="showtimes-title">
                          <FaClock className="showtimes-icon" /> Available Showtimes
                        </h4>
                        <div className="showtimes-grid">
                          {theater.showtimes.map((time, index) => (
                            <button 
                              key={index} 
                              onClick={() => handleTimeSelection(theater, time)}
                              className={`showtime-button ${selectedTime === time && selectedTheater?.id === theater.id ? 'selected' : ''}`}
                            >
                              <FaClock className="showtime-icon" /> {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-theaters">
                  <div className="no-theaters-icon">🎬</div>
                  <h3 className="no-theaters-title">No theaters available</h3>
                  <p className="no-theaters-message">We couldn't find any theaters for the selected location.</p>
                  <button 
                    onClick={() => {
                      setSelectedLocation('');
                      setSelectedTheater(null);
                      setSelectedTime('');
                    }}
                    className="reset-locations-button"
                  >
                    Show All Locations
                  </button>
                </div>
              )}
            </div>

            {selectedTheater && selectedTime && (
              <div className="booking-confirmation">
                <div className="confirmation-content">
                  <h3 className="confirmation-title">
                    <MdOutlineConfirmationNumber className="confirmation-icon" /> Ready to Book
                  </h3>
                  <div className="confirmation-details">
                    <div className="movie-confirmation-card">
                      <h4 className="confirmation-subtitle">Movie Details</h4>
                      <div className="movie-confirmation">
                        <img 
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                          alt={movie.title}
                          className="confirmation-poster"
                        />
                        <div>
                          <p className="confirmation-movie-title">{movie.title}</p>
                          <p className="confirmation-movie-meta">{movie.runtime} mins | {movie.genres[0]?.name}</p>
                          <div className="confirmation-rating">
                            <FaStar className="rating-icon" />
                            <span className="rating-value">{movie.vote_average.toFixed(1)}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="show-confirmation-card">
                      <h4 className="confirmation-subtitle">Show Details</h4>
                      <div className="show-details">
                        <p className="show-theater">
                          <span className="show-theater-name">{selectedTheater.name}</span>
                        </p>
                        <p className="show-location">
                          <FaMapMarkerAlt className="show-icon" /> {selectedTheater.location}
                        </p>
                        <p className="show-date">
                          <FaCalendarAlt className="show-icon" /> {selectedDate}
                        </p>
                        <p className="show-time">
                          <FaClock className="show-icon" /> {selectedTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="proceed-button-container">
                    <button 
                      onClick={handleProceedToBooking}
                      disabled={!selectedDate}
                      className="proceed-button"
                    >
                      Proceed to Seat Selection
                      <svg className="proceed-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-about">
              <div className="footer-logo">
                <MdLocalMovies className="footer-logo-icon" />
                <span className="footer-logo-part1">Movie</span><span className="footer-logo-part2">Verse</span>
              </div>
              <p className="footer-description">
                Your premium destination for the ultimate movie experience. Book tickets for the latest blockbusters in theaters near you.
              </p>
              <div className="social-links">
                <a href="#" className="social-link facebook">
                  <FaFacebook />
                </a>
                <a href="#" className="social-link twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link youtube">
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-list">
                <li>
                  <Link to="/" className="footer-link">
                    <span className="link-bullet"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/movies" className="footer-link">
                    <span className="link-bullet"></span>
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to="/theaters" className="footer-link">
                    <span className="link-bullet"></span>
                    Theaters
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="footer-link">
                    <span className="link-bullet"></span>
                    Offers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4 className="footer-title">Information</h4>
              <ul className="footer-list">
                <li>
                  <Link to="/about" className="footer-link">
                    <span className="link-bullet"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">
                    <span className="link-bullet"></span>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="footer-link">
                    <span className="link-bullet"></span>
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="footer-link">
                    <span className="link-bullet"></span>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4 className="footer-title">Newsletter</h4>
              <p className="newsletter-text">
                Subscribe to get updates on new releases, special offers and more.
              </p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="newsletter-input"
                />
                <button className="newsletter-button">
                  Subscribe
                </button>
              </div>
              <p className="newsletter-disclaimer">
                We'll never share your email with anyone else.
              </p>
            </div>
          </div>

          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} CineFlix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Booking;



// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, 
//   FaChair, FaPlay, FaTimes, FaArrowLeft
// } from 'react-icons/fa';
// import { MdLocalMovies, MdTheaters } from 'react-icons/md';
// import { IoMdTime } from 'react-icons/io';
// import { BsCurrencyRupee } from 'react-icons/bs';

// const API_KEY = '4b64c817b80e0c6f8e5fe98bb3e6393c';

// function Booking() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState(null);
//   const [theaters, setTheaters] = useState([]);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedTheater, setSelectedTheater] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const locations = [
//     { id: 'delhi', name: 'Delhi' },
//     { id: 'mumbai', name: 'Mumbai' },
//     { id: 'bangalore', name: 'Bangalore' },
//     { id: 'hyderabad', name: 'Hyderabad' },
//     { id: 'kolkata', name: 'Kolkata' }
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const movieResponse = await axios.get(
//           `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
//         );
//         setMovie(movieResponse.data);

//         // Mock theater data
//         const mockTheaters = [
//           {
//             id: 1,
//             name: 'PVR Cinemas',
//             location: 'Delhi',
//             showtimes: ['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM'],
//             price: 250,
//             seats: 120,
//             amenities: ['Dolby Atmos', 'Recliner Seats', 'Food Court']
//           },
//           {
//             id: 2,
//             name: 'INOX Movies',
//             location: 'Mumbai',
//             showtimes: ['11:00 AM', '2:30 PM', '5:45 PM', '9:00 PM'],
//             price: 300,
//             seats: 80,
//             amenities: ['IMAX', '3D', 'Cafe']
//           },
//           {
//             id: 3,
//             name: 'Cinepolis',
//             location: 'Bangalore',
//             showtimes: ['9:30 AM', '12:45 PM', '4:00 PM', '7:15 PM'],
//             price: 350,
//             seats: 150,
//             amenities: ['4DX', 'VIP Lounge', 'Bar']
//           }
//         ];
        
//         setTheaters(mockTheaters);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const filteredTheaters = selectedLocation 
//     ? theaters.filter(theater => theater.location === selectedLocation)
//     : theaters;

//   const today = new Date().toISOString().split('T')[0];
//   const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

//   const handleTimeSelection = (theater, time) => {
//     setSelectedTheater(theater);
//     setSelectedTime(time);
//   };

//   const handleProceedToBooking = () => {
//     if (!selectedLocation || !selectedDate || !selectedTime || !selectedTheater) {
//       alert('Please select location, date, time, and theater before proceeding');
//       return;
//     }

//     navigate('/seat-selection', {
//       state: {
//         movie,
//         theater: selectedTheater,
//         showtime: selectedTime,
//         date: selectedDate,
//         location: selectedLocation
//       }
//     });
//   };

//   if (loading) {
//     return <div>Loading movie details...</div>;
//   }

//   return (
//     <div>
//       <header>
//         <Link to="/">
//           <FaArrowLeft /> Back to Home
//         </Link>
//         <div>
//           <MdLocalMovies />
//           <span>CineVerse</span>
//         </div>
//       </header>

//       {movie && (
//         <section>
//           <div>
//             <img 
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
//               alt={movie.title}
//             />
//           </div>

//           <div>
//             <h1>{movie.title}</h1>
//             <div>
//               <span><FaStar /> {movie.vote_average}/10</span>
//               <span><IoMdTime /> {movie.runtime} mins</span>
//               <span>
//                 {new Date(movie.release_date).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </span>
//             </div>
            
//             <div>
//               {movie.genres.map(genre => (
//                 <span key={genre.id}>{genre.name}</span>
//               ))}
//             </div>

//             <h3>Overview</h3>
//             <p>{movie.overview}</p>
//           </div>
//         </section>
//       )}

//       <section>
//         <h2><MdTheaters /> Book Your Tickets</h2>

//         <div>
//           <div>
//             <label><FaMapMarkerAlt /> Location</label>
//             <select 
//               value={selectedLocation} 
//               onChange={(e) => {
//                 setSelectedLocation(e.target.value);
//                 setSelectedTheater(null);
//                 setSelectedTime('');
//               }}
//             >
//               <option value="">Select Location</option>
//               {locations.map(loc => (
//                 <option key={loc.id} value={loc.name}>{loc.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label><FaCalendarAlt /> Date</label>
//             <input 
//               type="date" 
//               value={selectedDate} 
//               onChange={(e) => setSelectedDate(e.target.value)}
//               min={today}
//               max={nextWeek}
//             />
//           </div>
//         </div>

//         <div>
//           {filteredTheaters.length > 0 ? (
//             filteredTheaters.map(theater => (
//               <div key={theater.id}>
//                 <div>
//                   <h3>{theater.name}</h3>
//                   <span>
//                     <FaMapMarkerAlt /> {theater.location}
//                   </span>
//                 </div>

//                 <div>
//                   <div>
//                     <span>
//                       <BsCurrencyRupee /> {theater.price}
//                     </span>
//                     <span>
//                       <FaChair /> {theater.seats} seats left
//                     </span>
//                   </div>

//                   <div>
//                     {theater.amenities.map((amenity, index) => (
//                       <span key={index}>{amenity}</span>
//                     ))}
//                   </div>

//                   <div>
//                     <h4>Available Showtimes:</h4>
//                     <div>
//                       {theater.showtimes.map((time, index) => (
//                         <button 
//                           key={index} 
//                           onClick={() => handleTimeSelection(theater, time)}
//                         >
//                           <FaClock /> {time}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div>
//               <p>No theaters available for the selected location.</p>
//               <button 
//                 onClick={() => {
//                   setSelectedLocation('');
//                   setSelectedTheater(null);
//                   setSelectedTime('');
//                 }}
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}
//         </div>

//         {selectedTheater && selectedTime && (
//           <div>
//             <h3>Your Selection:</h3>
//             <p><strong>Theater:</strong> {selectedTheater.name}, {selectedTheater.location}</p>
//             <p><strong>Date:</strong> {selectedDate}</p>
//             <p><strong>Time:</strong> {selectedTime}</p>
//             <p><strong>Price:</strong> <BsCurrencyRupee /> {selectedTheater.price}</p>
            
//             <button 
//               onClick={handleProceedToBooking}
//               disabled={!selectedDate}
//             >
//               Proceed to Seat Selection
//             </button>
//           </div>
//         )}
//       </section>

//       <footer>
//         <div>
//           <div>
//             <MdLocalMovies />
//             <span>CineVerse</span>
//           </div>
//           <p>© {new Date().getFullYear()} CineVerse. All rights reserved.</p>
//           <div>
//             <Link to="/terms">Terms</Link>
//             <Link to="/privacy">Privacy</Link>
//             <Link to="/contact">Contact</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Booking;













// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import ReactPlayer from 'react-player';
// import { 
//   FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, 
//   FaChair, FaPlay, FaTimes, FaArrowLeft
// } from 'react-icons/fa';
// import { MdLocalMovies, MdTheaters } from 'react-icons/md';
// import { IoMdTime } from 'react-icons/io';
// import { BsCurrencyRupee } from 'react-icons/bs';

// const API_KEY = '4b64c817b80e0c6f8e5fe98bb3e6393c';

// function Booking() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [theaters, setTheaters] = useState([]);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [showTrailer, setShowTrailer] = useState(false);
//   const [trailerUrl, setTrailerUrl] = useState('');

//   const locations = [
//     { id: 'delhi', name: 'Delhi' },
//     { id: 'mumbai', name: 'Mumbai' },
//     { id: 'bangalore', name: 'Bangalore' },
//     { id: 'hyderabad', name: 'Hyderabad' },
//     { id: 'kolkata', name: 'Kolkata' }
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch movie details
//         const movieResponse = await axios.get(
//           `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
//         );
//         setMovie(movieResponse.data);

//         // Fetch movie trailer
//         const videosResponse = await axios.get(
//           `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
//         );
//         const trailer = videosResponse.data.results.find(
//           video => video.type === 'Trailer' && video.site === 'YouTube'
//         );
//         if (trailer) {
//           setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
//         }

//         // Mock theater data
//         const mockTheaters = [
//           {
//             id: 1,
//             name: 'PVR Cinemas',
//             location: 'Delhi',
//             showtimes: ['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM'],
//             price: 250,
//             seats: 120,
//             amenities: ['Dolby Atmos', 'Recliner Seats', 'Food Court']
//           },
//           {
//             id: 2,
//             name: 'INOX Movies',
//             location: 'Mumbai',
//             showtimes: ['11:00 AM', '2:30 PM', '5:45 PM', '9:00 PM'],
//             price: 300,
//             seats: 80,
//             amenities: ['IMAX', '3D', 'Cafe']
//           },
//           {
//             id: 3,
//             name: 'Cinepolis',
//             location: 'Bangalore',
//             showtimes: ['9:30 AM', '12:45 PM', '4:00 PM', '7:15 PM'],
//             price: 350,
//             seats: 150,
//             amenities: ['4DX', 'VIP Lounge', 'Bar']
//           }
//         ];
        
//         setTheaters(mockTheaters);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const filteredTheaters = selectedLocation 
//     ? theaters.filter(theater => theater.location === selectedLocation)
//     : theaters;

//   const today = new Date().toISOString().split('T')[0];
//   const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner"></div>
//         <p>Loading movie details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="booking-page">
//       {/* Navigation Bar */}
//       <header className="booking-header">
//         <Link to="/" className="back-button">
//           <FaArrowLeft /> Back to Home
//         </Link>
//         <div className="header-logo">
//           <MdLocalMovies className="logo-icon" />
//           <span>CineVerse</span>
//         </div>
//       </header>

//       {/* Movie Details Section */}
//       {movie && (
//         <section className="movie-section">
//           <div className="movie-poster-container">
//             <img 
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
//               alt={movie.title}
//               className="movie-poster"
//             />
//             {trailerUrl && (
//               <button 
//                 className="trailer-button"
//                 onClick={() => setShowTrailer(true)}
//               >
//                 <FaPlay /> Watch Trailer
//               </button>
//             )}
//           </div>

//           <div className="movie-info">
//             <h1 className="movie-title">{movie.title}</h1>
//             <div className="movie-meta">
//               <span className="rating"><FaStar /> {movie.vote_average}/10</span>
//               <span className="runtime"><IoMdTime /> {movie.runtime} mins</span>
//               <span className="release-date">
//                 {new Date(movie.release_date).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </span>
//             </div>
            
//             <div className="genres">
//               {movie.genres.map(genre => (
//                 <span key={genre.id} className="genre-tag">{genre.name}</span>
//               ))}
//             </div>

//             <h3>Overview</h3>
//             <p className="overview">{movie.overview}</p>
//           </div>
//         </section>
//       )}

//       {/* Trailer Modal */}
//       {showTrailer && (
//         <div className="trailer-modal">
//           <div className="modal-content">
//             <button 
//               className="close-modal"
//               onClick={() => setShowTrailer(false)}
//             >
//               <FaTimes />
//             </button>
//             <ReactPlayer
//               url={trailerUrl}
//               playing={true}
//               controls={true}
//               width="100%"
//               height="100%"
//             />
//           </div>
//         </div>
//       )}

//       {/* Booking Section */}
//       <section className="booking-section">
//         <h2 className="section-title">
//           <MdTheaters /> Book Your Tickets
//         </h2>

//         <div className="booking-filters">
//           <div className="filter-group">
//             <label><FaMapMarkerAlt /> Location</label>
//             <select 
//               value={selectedLocation} 
//               onChange={(e) => setSelectedLocation(e.target.value)}
//             >
//               <option value="">All Locations</option>
//               {locations.map(loc => (
//                 <option key={loc.id} value={loc.name}>{loc.name}</option>
//               ))}
//             </select>
//           </div>

//             <div className="filter-group">
//               <label><FaCalendarAlt /> Date</label>
//               <input 
//                 type="date" 
//                 value={selectedDate} 
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 min={today}
//                 max={nextWeek}
//               />
//             </div>
//           </div>

//           <div className="theaters-container">
//             {filteredTheaters.length > 0 ? (
//               filteredTheaters.map(theater => (
//                 <div key={theater.id} className="theater-card">
//                   <div className="theater-header">
//                     <h3>{theater.name}</h3>
//                     <span className="theater-location">
//                       <FaMapMarkerAlt /> {theater.location}
//                     </span>
//                   </div>

//                   <div className="theater-details">
//                     <div className="pricing">
//                       <span className="price">
//                         <BsCurrencyRupee /> {theater.price}
//                       </span>
//                       <span className="seats">
//                         <FaChair /> {theater.seats} seats left
//                       </span>
//                     </div>

//                     <div className="amenities">
//                       {theater.amenities.map((amenity, index) => (
//                         <span key={index} className="amenity-tag">{amenity}</span>
//                       ))}
//                     </div>

//                     <div className="showtimes">
//                       <h4>Available Showtimes:</h4>
//                       <div className="time-slots">
//                         {theater.showtimes.map((time, index) => (
//                           <button key={index} className="time-slot">
//                             <FaClock /> {time}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <button className="book-now-btn" onClick={() => window.location.href = "/seat-Selection"}>
//                     Proceed to Booking
//                  </button>
//                 </div>
//               ))
//             ) : (
//               <div className="no-theaters">
//                 <p>No theaters available for the selected location.</p>
//                 <button 
//                   className="clear-filters"
//                   onClick={() => setSelectedLocation('')}
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </div>
//       </section>

//       {/* Footer */}
//       <footer className="booking-footer">
//         <div className="footer-content">
//           <div className="footer-logo">
//             <MdLocalMovies className="logo-icon" />
//             <span>CineVerse</span>
//           </div>
//           <p>© {new Date().getFullYear()} CineVerse. All rights reserved.</p>
//           <div className="footer-links">
//             <Link to="/terms">Terms</Link>
//             <Link to="/privacy">Privacy</Link>
//             <Link to="/contact">Contact</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Booking;

// // Add this CSS to your stylesheet
// const styles = `
//   /* Base Styles */
//   .booking-page {
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     color: #333;
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 0 20px;
//   }

//   /* Header */
//   .booking-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 20px 0;
//     border-bottom: 1px solid #eee;
//     margin-bottom: 30px;
//   }

//   .back-button {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     color: #e50914;
//     text-decoration: none;
//     font-weight: 500;
//     transition: all 0.2s ease;
//   }

//   .back-button:hover {
//     color: #b2070f;
//   }

//   .header-logo {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 24px;
//     font-weight: bold;
//     color: #e50914;
//   }

//   .logo-icon {
//     font-size: 28px;
//   }

//   /* Loading Screen */
//   .loading-screen {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
//   }

//   .spinner {
//     border: 5px solid rgba(0, 0, 0, 0.1);
//     border-radius: 50%;
//     border-top: 5px solid #e50914;
//     width: 50px;
//     height: 50px;
//     animation: spin 1s linear infinite;
//     margin-bottom: 20px;
//   }

//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }

//   /* Movie Section */
//   .movie-section {
//     display: flex;
//     gap: 30px;
//     margin-bottom: 40px;
//   }

//   .movie-poster-container {
//     position: relative;
//     flex: 0 0 300px;
//     border-radius: 10px;
//     overflow: hidden;
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//   }

//   .movie-poster {
//     width: 100%;
//     height: auto;
//     display: block;
//   }

//   .trailer-button {
//     position: absolute;
//     bottom: 20px;
//     left: 50%;
//     transform: translateX(-50%);
//     background: rgba(229, 9, 20, 0.9);
//     color: white;
//     border: none;
//     padding: 10px 20px;
//     border-radius: 30px;
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s ease;
//   }

//   .trailer-button:hover {
//     background: rgba(229, 9, 20, 1);
//   }

//   .movie-info {
//     flex: 1;
//   }

//   .movie-title {
//     font-size: 2.2rem;
//     margin-bottom: 15px;
//     color: #222;
//   }

//   .movie-meta {
//     display: flex;
//     gap: 20px;
//     margin-bottom: 20px;
//     color: #555;
//   }

//   .movie-meta span {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//   }

//   .rating {
//     color: #e50914;
//     font-weight: 600;
//   }

//   .genres {
//     display: flex;
//     gap: 10px;
//     margin-bottom: 20px;
//     flex-wrap: wrap;
//   }

//   .genre-tag {
//     background: #f0f0f0;
//     padding: 5px 12px;
//     border-radius: 20px;
//     font-size: 0.9rem;
//   }

//   .overview {
//     line-height: 1.6;
//     color: #444;
//   }

//   /* Trailer Modal */
//   .trailer-modal {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: rgba(0, 0, 0, 0.9);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   }

//   .modal-content {
//     width: 80%;
//     max-width: 900px;
//     position: relative;
//   }

//   .close-modal {
//     position: absolute;
//     top: -40px;
//     right: 0;
//     background: none;
//     border: none;
//     color: white;
//     font-size: 1.5rem;
//     cursor: pointer;
//   }

//   /* Booking Section */
//   .booking-section {
//     margin-bottom: 50px;
//   }

//   .section-title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 1.8rem;
//     margin-bottom: 25px;
//     color: #222;
//   }

//   .booking-filters {
//     display: flex;
//     gap: 20px;
//     margin-bottom: 30px;
//     flex-wrap: wrap;
//   }

//   .filter-group {
//     flex: 1;
//     min-width: 200px;
//   }

//   .filter-group label {
//     display: block;
//     margin-bottom: 8px;
//     font-weight: 500;
//     color: #555;
//   }

//   .filter-group select, 
//   .filter-group input {
//     width: 100%;
//     padding: 10px 15px;
//     border: 1px solid #ddd;
//     border-radius: 5px;
//     font-size: 1rem;
//   }

//   /* Theaters */
//   .theaters-container {
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//   }

//   .theater-card {
//     background: white;
//     border-radius: 10px;
//     overflow: hidden;
//     box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
//     transition: transform 0.3s ease;
//   }

//   .theater-card:hover {
//     transform: translateY(-5px);
//   }

//   .theater-header {
//     background: #f8f8f8;
//     padding: 15px 20px;
//     border-bottom: 1px solid #eee;
//   }

//   .theater-header h3 {
//     margin: 0;
//     color: #222;
//   }

//   .theater-location {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     font-size: 0.9rem;
//     color: #666;
//   }

//   .theater-details {
//     padding: 20px;
//   }

//   .pricing {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 15px;
//   }

//   .price {
//     font-size: 1.5rem;
//     font-weight: 600;
//     color: #e50914;
//     display: flex;
//     align-items: center;
//     gap: 5px;
//   }

//   .seats {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     color: #666;
//   }

//   .amenities {
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
//     margin-bottom: 20px;
//   }

//   .amenity-tag {
//     background: #e8f4ff;
//     color: #0066cc;
//     padding: 5px 10px;
//     border-radius: 5px;
//     font-size: 0.8rem;
//   }

//   .showtimes h4 {
//     margin-bottom: 10px;
//     color: #444;
//   }

//   .time-slots {
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
//   }

//   .time-slot {
//     background:red;
//     border: none;
//     padding: 8px 15px;
//     border-radius: 5px;
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     cursor: pointer;
//     transition: all 0.2s ease;
//   }

//   .time-slot:hover {
//     background: #e50914;
//     color: white;
//   }

//   .book-now-btn {
//     width: 100%;
//     padding: 12px;
//     background: #e50914;
//     color: white;
//     border: none;
//     font-size: 1rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: background 0.3s ease;
//   }

//   .book-now-btn:hover {
//     background: #b2070f;
//   }

//   .no-theaters {
//     text-align: center;
//     padding: 40px 20px;
//     background: #f9f9f9;
//     border-radius: 10px;
//   }

//   .clear-filters {
//     margin-top: 15px;
//     padding: 8px 20px;
//     background: #e50914;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//   }

//   /* Footer */
//   .booking-footer {
//     background: #f8f8f8;
//     padding: 30px 0;
//     margin-top: 50px;
//     border-top: 1px solid #eee;
//   }

//   .footer-content {
//     max-width: 1200px;
//     margin: 0 auto;
//     text-align: center;
//   }

//   .footer-logo {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 15px;
//     color: #e50914;
//     font-weight: bold;
//     font-size: 1.2rem;
//   }

//   .footer-links {
//     display: flex;
//     justify-content: center;
//     gap: 20px;
//     margin-top: 15px;
//   }

//   .footer-links a {
//     color: #666;
//     text-decoration: none;
//     transition: color 0.2s ease;
//   }

//   .footer-links a:hover {
//     color: #e50914;
//   }

//   /* Responsive Styles */
//   @media (max-width: 768px) {
//     .movie-section {
//       flex-direction: column;
//     }

//     .movie-poster-container {
//       flex: 1;
//       margin-bottom: 20px;
//     }

//     .booking-filters {
//       flex-direction: column;
//       gap: 15px;
//     }
//   }
// `;

// // Add styles to the document
// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);