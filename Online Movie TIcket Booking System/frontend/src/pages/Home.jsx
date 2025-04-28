import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFilm, FaSearch, FaUser, FaStar, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';

const API_KEY = '46eaaffca8e87e387f2df72410ec8d3c';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = searchQuery
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
          : API_URL;

        const response = await axios.get(url);
        setMovies(response.data.results.slice(0, 20));

        localStorage.setItem(
          searchQuery ? `search_${searchQuery}` : 'popular_movies',
          JSON.stringify(response.data.results.slice(0, 20))
        );
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error);

        const cachedMovies = localStorage.getItem(
          searchQuery ? `search_${searchQuery}` : 'popular_movies'
        );
        if (cachedMovies) {
          setMovies(JSON.parse(cachedMovies));
        } else if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, 1000 * (retryCount + 1));
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, retryCount]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Clear auth tokens or user info here if stored
      navigate('/');
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <MdLocalMovies className="logo-icon" />
            <span>MovieVerse</span>
          </Link>

          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setRetryCount(0);
              }}
              className="search-input"
            />
          </div>

          <div className="navbar-links">
            <Link to="/" className="navbar-link active">Home</Link>
            <Link to="/movies" className="navbar-link">Movies</Link>
            <Link to="/tv-shows" className="navbar-link">TV Shows</Link>
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <div className="user-menu">
              <FaUser className="user-icon" />
              <div className="dropdown-content">
                <Link to="/activity">Activity</Link>
                <Link to="/settings">Settings</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="movie-app">
        <h1 className="app-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
        </h1>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading movies...</p>
          </div>
        ) : error && movies.length === 0 ? (
          <div className="error-container">
            <p>Failed to load movies. {retryCount < 3 ? 'Retrying...' : ''}</p>
            {retryCount >= 3 && (
              <button onClick={() => {
                setRetryCount(0);
                setError(null);
              }} className="retry-button">
                Try Again
              </button>
            )}
          </div>
        ) : movies.length === 0 ? (
          <div className="no-results">
            <p>No movies found for your search.</p>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-about">
              <div className="footer-logo">
                <MdLocalMovies className="logo-icon" />
                <span>CineVerse</span>
              </div>
              <p>Your ultimate destination for movie information, reviews, and ticket booking.</p>
              <div className="social-links">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaYoutube /></a>
              </div>
            </div>

            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/tv-shows">TV Shows</Link></li>
                <li><Link to="/upcoming">Upcoming</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>

            <div className="footer-links">
              <h3>Categories</h3>
              <ul>
                <li><Link to="/genre/action">Action</Link></li>
                <li><Link to="/genre/comedy">Comedy</Link></li>
                <li><Link to="/genre/drama">Drama</Link></li>
                <li><Link to="/genre/horror">Horror</Link></li>
                <li><Link to="/genre/sci-fi">Sci-Fi</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3>Contact Us</h3>
              <p><i className="fa fa-map-marker"></i> 123 Movie Street, Hollywood</p>
              <p><i className="fa fa-phone"></i> +1 234 567 890</p>
              <p><i className="fa fa-envelope"></i> info@cineverse.com</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} CineVerse. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/booking/${movie.id}`} className="movie-link">
        <div className="poster-container">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x750?text=Poster+Not+Available';
                e.target.onerror = null;
              }}
            />
          ) : (
            <div className="poster-placeholder">
              <MdLocalMovies className="placeholder-icon" />
              <span>{movie.title}</span>
            </div>
          )}

          <div className="movie-overlay">
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-overview">
                {movie.overview ? `${movie.overview.substring(0, 150)}...` : 'No description available.'}
              </p>
              <div className="movie-meta">
                <span className="rating">
                  <FaStar className="star-icon" /> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
                </span>
                <span className="release-date">
                  {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Coming Soon'}
                </span>
              </div>
              <button className="book-button">Book Tickets</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
//export default Home;

// CSS Styles for the enhanced navbar and footer
const styles = `
  /* App Container */
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100vw;
    background-color: #f8f9fa;
  }
  
  /* Enhanced Navbar Styles */
  .navbar {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .navbar-logo {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
    gap: 0.5rem;
  }
  
  .logo-icon {
    font-size: 2.2rem;
    color: #e50914;
  }
  
  .search-container {
    position: relative;
    width: 40%;
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    position: absolute;
    left: 15px;
    color: #94a3b8;
  }
  
  .search-input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 3rem;
    border-radius: 30px;
    border: none;
    background-color: #1e293b;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    outline: none;
    background-color: #334155;
    box-shadow: 0 0 0 2px #e50914;
  }
  
  .navbar-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .navbar-link {
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    padding: 0.5rem 0;
    position: relative;
  }
  
  .navbar-link:hover {
    color: white;
  }
  
  .navbar-link.active {
    color: white;
    font-weight: 600;
  }
  
  .navbar-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #e50914;
    border-radius: 3px;
  }
  
  .user-menu {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .user-icon {
    font-size: 1.3rem;
    color: #cbd5e1;
    transition: color 0.3s ease;
  }
  
  .user-menu:hover .user-icon {
    color: white;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1;
    overflow: hidden;
  }
  
  .dropdown-content a {
    color: #334155;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    transition: background-color 0.3s ease;
  }
  
  .dropdown-content a:hover {
    background-color: #f1f5f9;
  }
  
  .user-menu:hover .dropdown-content {
    display: block;
  }
  
  /* Movie App Styles (same as before) */
  .movie-app {
    width: 100%;
    flex: 1;
    padding: 2rem;
    background-color: #f8f9fa;
  }
  
  .app-title {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 2.5rem;
  }
  
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .movie-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    height: 100%;
    background-color: white;
  }
  
  .movie-card:hover {
    transform: translateY(-10px);
  }
  
  .movie-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
  }
  
  .poster-container {
    position: relative;
    width: 100%;
    height: 350px;
    overflow: hidden;
  }
  
  .movie-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .movie-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  .movie-card:hover .movie-overlay {
    opacity: 1;
  }
  
  .movie-card:hover .movie-poster {
    transform: scale(1.1);
  }
  
  .movie-info {
    transform: translateY(20px);
    transition: transform 0.3s ease;
  }
  
  .movie-card:hover .movie-info {
    transform: translateY(0);
  }
  
  .movie-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  
  .movie-overview {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: #ddd;
    line-height: 1.4;
  }
  
  .movie-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  .rating {
    color: #ffd700;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  
  .star-icon {
    font-size: 0.9rem;
  }
  
  .release-date {
    color: #aaa;
  }
  
  .book-button {
    background: #e50914;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    transition: background 0.3s ease;
  }
  
  .book-button:hover {
    background: #b2070f;
  }
  
  /* Enhanced Footer Styles */
  .footer {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: white;
    padding: 3rem 0 0;
    margin-top: auto;
  }
  
  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .footer-main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    margin-bottom: 2rem;
  }
  
  .footer-about {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    font-weight: bold;
    gap: 0.5rem;
  }
  
  .footer-about p {
    color: #94a3b8;
    line-height: 1.6;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
  }
  
  .social-links a {
    color: #94a3b8;
    font-size: 1.3rem;
    transition: color 0.3s ease;
  }
  
  .social-links a:hover {
    color: #e50914;
  }
  
  .footer-links h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: white;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .footer-links h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #e50914;
  }
  
  .footer-links ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .footer-links a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.3s ease;
    display: inline-block;
  }
  
  .footer-links a:hover {
    color: #e50914;
    transform: translateX(5px);
  }
  
  .footer-contact p {
    color: #94a3b8;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .footer-bottom {
    border-top: 1px solid #334155;
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-bottom p {
    color: #94a3b8;
    margin: 0;
  }
  
  .legal-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .legal-links a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.9rem;
  }
  
  .legal-links a:hover {
    color: #e50914;
  }
  
  @media (max-width: 768px) {
    .navbar-container {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
    
    .search-container {
      width: 100%;
    }
    
    .navbar-links {
      width: 100%;
      justify-content: space-between;
    }
    
    .footer-main {
      grid-template-columns: 1fr;
    }
  }
`;

// Add styles to the head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Home;