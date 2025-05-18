

<h1>🎬 Online Movie Ticket Booking System</h1>

<p>This is a complete full-stack web application that allows users to browse movies, select showtimes, and book tickets online. It also includes a secure payment gateway using <strong>Stripe</strong> to complete transactions. The system is built using the <strong>MERN</strong> stack (MongoDB, Express.js, React.js, Node.js) and styled with responsive design principles.</p>

<hr>

<h2>📁 Project Structure</h2>

<pre>
online-movie-ticket-booking/
│
├── backend/                  
│   ├── config/               # MongoDB and Stripe configuration
│   │   └── db.js
│   ├── controllers/          
│   │   └── bookingController.js
│   ├── models/               
│   │   └── Booking.js
│   ├── routes/               
│   │   └── bookingRoutes.js
│   ├── server.js             # Express server entry
│   └── .env                  # Environment variables
│
├── frontend/                 
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │   └── Booking.jsx
│   │   │   └── Payment.jsx       # Stripe Checkout Integration
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── screenshots/
│   ├── homepage.png
│   ├── booking-page.png
│   ├── confirmation-page.png
│
├── README.md
├── package.json (root)
</pre>

<hr>

<h2>💳 Payment Integration (Stripe)</h2>

<p>The payment functionality is implemented using the <strong>Stripe API</strong>. Users are redirected to a secure Stripe Checkout page to complete their payment.</p>

<h3>Backend Stripe Configuration</h3>
<ol>
  <li>Install Stripe using npm:</li>
  <pre><code>npm install stripe</code></pre>

  <li>Set up your Stripe key in the <code>.env</code> file:</li>
  <pre><code>STRIPE_SECRET_KEY=your_stripe_secret_key</code></pre>

  <li>In <code>bookingController.js</code>, create a Stripe session:</li>
  <pre><code>
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: "Movie Ticket",
        },
        unit_amount: 1000, // $10
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: "http://localhost:5173/confirmation",
    cancel_url: "http://localhost:5173/booking",
  });

  res.json({ id: session.id });
};
  </code></pre>
</ol>

<h3>Frontend Stripe Integration</h3>
<ol>
  <li>Install the Stripe frontend library:</li>
  <pre><code>npm install @stripe/stripe-js</code></pre>

  <li>In <code>Payment.jsx</code>, add this code:</li>
  <pre><code>
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

const handleCheckout = async () => {
  const res = await fetch('http://localhost:5000/api/booking/create-checkout-session', {
    method: 'POST',
  });
  const data = await res.json();
  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: data.id });
};
  </code></pre>
</ol>

<hr>

<h2>👩‍💻 Real-life Use Case: Isha's Ticket Booking</h2>

<p><strong>Isha</strong> visits the movie booking website to watch her favorite film. She browses the homepage, selects a movie, chooses a showtime, and proceeds to the booking page.</p>

<ul>
  <li>She fills in her name, email, and the number of tickets</li>
  <li>Clicks on “Proceed to Payment”</li>
  <li>The system redirects her to the <strong>Stripe Checkout</strong> page</li>
  <li>She enters her card details securely and submits</li>
  <li>She is redirected to the <strong>confirmation page</strong> with a booking ID and message: "Thank you, Isha! Your ticket has been booked!"</li>
</ul>

<p>This demonstrates how the system handles a full booking lifecycle from selection to payment and confirmation.</p>

<hr>

<h2>🔧 How to Setup and Run the Project</h2>

<h3>Backend</h3>
<ol>
  <li>Navigate to backend folder:</li>
  <pre><code>cd backend</code></pre>
  <li>Install dependencies:</li>
  <pre><code>npm install</code></pre>
  <li>Create <code>.env</code> with your own keys:</li>
  <pre><code>
MONGO_URI=your_mongo_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
  </code></pre>
  <li>Run the server:</li>
  <pre><code>npm start</code></pre>
</ol>

<h3>Frontend</h3>
<ol>
  <li>Navigate to frontend folder:</li>
  <pre><code>cd frontend</code></pre>
  <li>Install dependencies:</li>
  <pre><code>npm install</code></pre>
  <li>Run the frontend app:</li>
  <pre><code>npm run dev</code></pre>
</ol>

<p>Open your browser and go to <code>http://localhost:5173</code></p>

<hr>

<h2>🎨 Features</h2>
<ul>
  <li>Search and view upcoming movies</li>
  <li>Book tickets for different shows</li>
  <li>Secure payment gateway using Stripe</li>
  <li>Confirmation page with booking reference</li>
  <li>Responsive UI design</li>
</ul>

<hr>

<h2>🖼️ Screenshots</h2>

<h4>Homepage</h4>
<img src="./screenshots/homepage.png" alt="Homepage" width="600" />

<h4>Booking Page</h4>
<img src="./screenshots/booking-page.png" alt="Booking Page" width="600" />

<h4>Confirmation Page</h4>
<img src="./screenshots/confirmation-page.png" alt="Confirmation Page" width="600" />

<hr>

<h2>📌 Future Enhancements</h2>
<ul>
  <li>User authentication (login/signup)</li>
  <li>Admin panel for adding/editing movies and schedules</li>
  <li>Seat selection UI</li>
  <li>Email notifications on successful booking</li>
</ul>

<hr>

<h2>🤝 Contributing</h2>
<p>If you would like to contribute, please fork this repository and submit a pull request.</p>

<hr>

<h2>📄 License</h2>
<p>This project is licensed under the MIT License.</p>

</body>
</html>
