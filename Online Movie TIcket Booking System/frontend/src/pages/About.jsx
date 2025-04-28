// src/pages/About.js
import React from 'react';
//import './Pages.css';

function About() {
  return (
    <div className="page-container">
      <h1>About MovieApp 🎬</h1>

      <section>
        <p>
          <strong>MovieApp</strong> is a modern and user-friendly platform designed for movie enthusiasts.
          Whether you are searching for the latest blockbuster or exploring old classics, MovieApp helps
          you discover, explore, and track your favorite movies with ease.
        </p>
        <p>
          Powered by real-time data from <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDb)</a>,
          MovieApp delivers accurate and rich movie details, cast information, release dates, ratings, trailers, and more.
        </p>
      </section>

      <section>
        <h2>✨ Features</h2>
        <ul>
          <li>🎞️ Search for any movie by title</li>
          <li>📈 View trending, top-rated, and upcoming films</li>
          <li>👨‍🎤 Explore actor and director profiles</li>
          <li>🗓️ Filter movies by genre or release year</li>
          <li>📽️ Watch trailers and read overviews</li>
          <li>💬 Add your own reviews (coming soon!)</li>
        </ul>
      </section>

      <section>
        <h2>🛠️ Technology Stack</h2>
        <ul>
          <li>Frontend: <strong>React.js + Vite</strong></li>
          <li>Styling: <strong>CSS3</strong> (or Tailwind/Bootstrap, if included)</li>
          <li>API: <strong>TMDb (The Movie Database) API</strong></li>
          <li>Routing: <strong>React Router</strong></li>
        </ul>
      </section>

      <section>
        <h2>📢 Our Mission</h2>
        <p>
          At MovieApp, our goal is to simplify the movie-watching experience. We aim to build a platform where
          users can not only explore movies but also track what they've watched, rate content, and get personalized recommendations
          — all in one place.
        </p>
      </section>

      <section>
        <h2>📌 Acknowledgement</h2>
        <p>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-fd1f5f964f9a3eb6b660a58033ec1aaf0e5311b1caa4b135263d42e6b7f17f91.svg"
          alt="TMDb Logo"
          style={{ width: '150px', marginTop: '10px' }}
        />
      </section>
    </div>
  );
}

export default About;
