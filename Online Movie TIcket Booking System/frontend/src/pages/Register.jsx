import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('Invalid email format');
            setShowPopup(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            setMessage(response.data.message);
            setShowPopup(true);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setMessage('');
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#000',
        },
        form: {
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            width: '400px',
            textAlign: 'center',
        },
        input: {
            margin: '15px 0',
            padding: '12px',
            width: '100%',
            borderRadius: '6px',
            border: '1px solid #ddd',
            outline: 'none',
            fontSize: '16px',
        },
        button: {
            margin: '12px 0',
            padding: '14px',
            width: '100%',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            fontSize: '18px',
            transition: 'background-color 0.3s ease',
        },
        loginButton: {
            margin: '8px 0',
            padding: '10px',
            width: '100%',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            fontSize: '16px',
        },
        popup: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            zIndex: 1000,
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 999,
        },
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleRegister} style={styles.form}>
                <h2>Register</h2>
                <input
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    style={styles.input}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" style={styles.button}>Register</button>
                <button style={styles.loginButton} onClick={() => navigate('/login')}>Login</button>
            </form>

            {showPopup && (
                <>
                    <div style={styles.overlay} onClick={closePopup}></div>
                    <div style={styles.popup}>
                        <h3>{message}</h3>
                        <button style={styles.button} onClick={closePopup}>OK</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Register;
