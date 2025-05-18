
<h1>🎬 Online Movie Ticket Booking System</h1>

<p>This is a full-stack web application that allows users to browse movies, book tickets, and receive booking confirmations. Built using the MERN stack (MongoDB, Express, React, Node.js), it provides a smooth and responsive user experience for online movie ticket booking.</p>

<hr>

<h2>📂 Project Structure</h2>

<pre>
online-movie-ticket-booking/
│
├── backend/                  # Backend files and server logic
│   ├── config/               # Database configuration
│   ├── controllers/          # Controller functions for booking logic
│   ├── models/               # Mongoose models for MongoDB
│   ├── routes/               # Express routes for APIs
│   ├── server.js             # Entry point for Express server
│   └── .env                  # Environment variables (e.g., DB URI)
│
├── frontend/                 # React-based frontend application
│   ├── public/               # Static public files
│   ├── src/
│   │   ├── components/       # Navbar and Footer components
│   │   ├── pages/            # Home and Booking pages
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # React app bootstrap
│   └── package.json          # Frontend dependencies
│
├── screenshots/              # Screenshots of the application
│   ├── homepage.png
│   ├── booking-page.png
│   └── confirmation-page.png
│
├── README.md                 # Project documentation
├── package.json              # Root dependencies (if any)
</pre>

<hr>

<h2>🚀 Features</h2>

<ul>
  <li>User-friendly interface to browse and book movie tickets</li>
  <li>View available movies and showtimes</li>
  <li>Booking confirmation with ticket details</li>
  <li>Responsive design compatible with mobile and desktop</li>
  <li>Node.js + Express.js backend with RESTful APIs</li>
  <li>MongoDB for data persistence</li>
</ul>

<hr>

<h2>🛠️ Technologies Used</h2>

<ul>
  <li><strong>Frontend:</strong> React.js, HTML, CSS, JavaScript</li>
  <li><strong>Backend:</strong> Node.js, Express.js</li>
  <li><strong>Database:</strong> MongoDB (Mongoose)</li>
  <li><strong>Other Tools:</strong> Vite, Axios, Dotenv</li>
</ul>

<hr>

<h2>⚙️ How to Run the Project</h2>

<h3>Backend Setup</h3>
<ol>
  <li>Navigate to the <code>backend/</code> folder:</li>
  <pre><code>cd backend</code></pre>

  <li>Install dependencies:</li>
  <pre><code>npm install</code></pre>

  <li>Create a <code>.env</code> file with the following content:</li>
  <pre><code>MONGO_URI=your_mongodb_connection_string
PORT=5000</code></pre>

  <li>Start the backend server:</li>
  <pre><code>npm start</code></pre>
</ol>

<h3>Frontend Setup</h3>
<ol>
  <li>Navigate to the <code>frontend/</code> folder:</li>
  <pre><code>cd frontend</code></pre>

  <li>Install dependencies:</li>
  <pre><code>npm install</code></pre>

  <li>Start the React development server:</li>
  <pre><code>npm run dev</code></pre>
</ol>

<h3>Access the App</h3>
<p>Visit <code>http://localhost:5173</code> in your browser to use the app.</p>

<hr>

<h2>🖼️ Screenshots</h2>

<h4>Homepage</h4>
<img src="./screenshots/homepage.png" alt="Homepage" width="600">

<h4>Booking Page</h4>
<img src="./screenshots/booking-page.png" alt="Booking Page" width="600">

<h4>Confirmation Page</h4>
<img src="./screenshots/confirmation-page.png" alt="Confirmation Page" width="600">

<hr>

<h2>📌 Future Improvements</h2>
<ul>
  <li>Authentication for users and admins</li>
  <li>Payment gateway integration</li>
  <li>Movie filters by date, genre, or language</li>
  <li>Seat selection and real-time availability</li>
</ul>

<hr>

<h2>🙌 Contributing</h2>
<p>Contributions are welcome! Please fork this repository and submit a pull request for any improvements.</p>

<hr>

<h2>📄 License</h2>
<p>This project is licensed under the MIT License.</p>

</body>
</html>
