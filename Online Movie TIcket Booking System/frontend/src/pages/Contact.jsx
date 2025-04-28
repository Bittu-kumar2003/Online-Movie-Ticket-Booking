import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending your message...');

    emailjs.sendForm(
      'service_jked5pq',
      'template_njuw99d',
      formRef.current,
      'rWXNz_n6mAh1R_uyU'
    )
    .then(() => {
      setStatus('Message sent successfully! ✅');
      formRef.current.reset();
      setIsSubmitting(false);
    })
    .catch(() => {
      setStatus('Failed to send message. Please try again later. ❌');
      setIsSubmitting(false);
    });
  };

  return (
    <div className="contact-page">
      {/* Beautiful Header with Movie Theme */}
      <header className="contact-header">
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1 className="header-title">Reel Connections</h1>
          <p className="header-subtitle">Lights, camera, conversation! We're all ears for your movie musings</p>
          <div className="film-strip"></div>
        </div>
      </header>

      <div className="contact-container">
        <div className="contact-content">
          {/* Contact Information Card with Movie Theme */}
          <div className="contact-info-card">
            <div className="card-header">
              <div className="clapboard-icon">🎬</div>
              <h2 className="info-title">Studio Information</h2>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h3>Our Studio</h3>
                <p>Film City, New Delhi, India</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div>
                <h3>Email Us</h3>
                <p>reel@movieapp.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div>
                <h3>Call Us</h3>
                <p>+91-9876543210</p>
              </div>
            </div>
            
            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon" title="Instagram">🎥</a>
                <a href="#" className="social-icon" title="Twitter">🍿</a>
                <a href="#" className="social-icon" title="Facebook">🎞️</a>
                <a href="#" className="social-icon" title="YouTube">📽️</a>
              </div>
            </div>
          </div>

          {/* Contact Form with Movie Theme */}
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-header">
              <h2 className="form-title">Director's Cut</h2>
              <p className="form-subtitle">Send us your script - we're always looking for great stories!</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Your Stage Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. John Director"
                className="form-input"
                required
              />
              <span className="input-focus-border"></span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Best Contact</label>
              <input
                type="email"
                id="email"
                name="email_id"
                placeholder="e.g. john@movies.com"
                className="form-input"
                required
              />
              <span className="input-focus-border"></span>
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Story</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your movie idea or question..."
                className="form-textarea"
                rows="5"
                required
              ></textarea>
              <span className="input-focus-border"></span>
            </div>
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Rolling Camera...
                </>
              ) : (
                'Action! Send Message 🎬'
              )}
            </button>
            
            {status && (
              <div className={`status-msg ${status.includes('✅') ? 'success' : status.includes('❌') ? 'error' : 'info'}`}>
                {status}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Cinematic Footer */}
      <footer className="contact-footer">
        <div className="footer-curtain"></div>
        <div className="footer-content">
          <div className="footer-section">
            <h3>MovieApp Studios</h3>
            <p>Where every story finds its audience</p>
            <div className="studio-badge">🏆 Award Winning 2023</div>
          </div>
          <div className="footer-section">
            <h3>Quick Reels</h3>
            <ul>
              <li><a href="#">Now Showing</a></li>
              <li><a href="#">Coming Soon</a></li>
              <li><a href="#">Classics</a></li>
              <li><a href="#">Film Festivals</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Investor Relations</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="film-reel"></div>
          <p>&copy; {new Date().getFullYear()} MovieApp Studios. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a> | <a href="#">Cookie Preferences</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;