import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSearch, FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header style={styles.header}>
      {/* Main Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>🎬 MovieMagic</h1>
          <p style={styles.tagline}>Book your movie experience</p>
        </div>
        
        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            <FaHome style={styles.linkIcon} />
            <span>Home</span>
          </Link>
          <Link to="/about" style={styles.link}>
            <FaInfoCircle style={styles.linkIcon} />
            <span>About</span>
          </Link>
          <Link to="/contact" style={styles.link}>
            <FaEnvelope style={styles.linkIcon} />
            <span>Contact</span>
          </Link>
        </div>

        {/* Search Bar - Moved to the right side */}
        <div style={styles.searchContainer}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              <FaSearch />
            </button>
          </form>
        </div>

        <div style={styles.authLinks}>
          <Link to="/login" style={styles.authLink}>
            <FaSignInAlt style={styles.authIcon} />
            <span>Login</span>
          </Link>
          <Link to="/profile" style={styles.authLink}>
            <FaUser style={styles.authIcon} />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    color: 'white',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: 0,
    background: 'linear-gradient(to right, #ff8a00, #e52e71)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  tagline: {
    fontSize: '0.8rem',
    margin: 0,
    color: 'rgba(255,255,255,0.7)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    padding: '0.5rem 0',
  },
  linkIcon: {
    fontSize: '1.1rem',
  },
  authLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: '1.5rem',
    paddingLeft: '1.5rem',
    borderLeft: '1px solid rgba(255,255,255,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  authLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
  },
  authIcon: {
    fontSize: '1rem',
  },
  searchContainer: {
    flex: 2,
    margin: '0 1rem',
  },
  searchForm: {
    display: 'flex',
    width: '100%',
    borderRadius: '25px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  searchInput: {
    flex: 1,
    padding: '0.5rem 1.2rem',
    border: 'none',
    fontSize: '0.9rem',
    outline: 'none',
  },
  searchButton: {
    padding: '0 1.2rem',
    border: 'none',
    background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
};

export default Navbar;