import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilm, FaStar, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const API_KEY = '46eaaffca8e87e387f2df72410ec8d3c';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = searchQuery
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        
        const response = await axios.get(url);
        setMovies(response.data.results.slice(0, 12));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMovieClick = (movieId) => {
    navigate('/register', { state: { movieId } });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <FaFilm className="logo-icon" />
            <h1>MovieVerse</h1>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="search-button">
              <svg viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="section-title">
          {searchQuery ? `Results for "${searchQuery}"` : 'Popular Movies'}
        </h2>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : movies.length === 0 ? (
          <div className="no-results">
            <img src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/ad42057889c385dd8f84b8330f69269b.gif" alt="No results" />
            <p>No movies found. Try a different search.</p>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div 
                key={movie.id} 
                className="movie-card"
                onClick={() => handleMovieClick(movie.id)}
              >
                <div className="poster-container">
                  <img
                    src={movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Poster'}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <div className="movie-overlay">
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <div className="movie-meta">
                        <span className="rating">
                          <FaStar className="star-icon" />
                          {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="year">
                          {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
                        </span>
                      </div>
                      <p className="movie-description">
                        {movie.overview ? movie.overview.substring(0, 150) + '...' : 'No description available'}
                      </p>
                      <button className="register-button">Register to View</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About MovieVerse</h3>
            <p>Discover your next favorite movie with our extensive collection of films from around the world.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Popular</a></li>
              <li><a href="#">Upcoming</a></li>
              <li><a href="#">Top Rated</a></li>
              <li><a href="#">Now Playing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MovieVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;