import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const styles = {
        container: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        card: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            width: '100%',
            maxWidth: '500px',
            textAlign: 'center',
            transform: 'translateY(-20px)',
            animation: 'fadeInUp 0.5s ease-out forwards',
        },
        title: {
            color: '#2d3748',
            marginBottom: '1.5rem',
            fontSize: '2rem',
            fontWeight: '600',
        },
        inputContainer: {
            marginBottom: '1.2rem',
            textAlign: 'left',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            color: '#4a5568',
            fontSize: '0.9rem',
            fontWeight: '500',
        },
        input: {
            width: '100%',
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            transition: 'all 0.3s',
            boxSizing: 'border-box',
            backgroundColor: '#f8fafc',
        },
        button: {
            width: '100%',
            padding: '0.9rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            marginTop: '0.5rem',
        },
        loginButton: {
            background: 'linear-gradient(to right, #667eea, #764ba2)',
            color: 'white',
            marginBottom: '1rem',
        },
        registerButton: {
            backgroundColor: '#edf2f7',
            color: '#4a5568',
        },
        message: {
            margin: '1rem 0',
            color: '#e53e3e',
            fontSize: '0.9rem',
            minHeight: '1.2rem',
        },
        loading: {
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            borderTopColor: 'white',
            animation: 'spin 1s ease-in-out infinite',
            marginRight: '10px',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome Back</h1>
                <form onSubmit={handleLogin}>
                    <div style={styles.inputContainer}>
                        <label style={styles.label} htmlFor="email">Email</label>
                        <input
                            style={styles.input}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label} htmlFor="password">Password</label>
                        <input
                            style={styles.input}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.message}>
                        {message && <span>{message}</span>}
                    </div>
                    <button style={{ ...styles.button, ...styles.loginButton }} type="submit" disabled={isLoading}>
                        {isLoading ? <><span style={styles.loading}></span>Logging in...</> : 'Login'}
                    </button>
                </form>
                <button style={{ ...styles.button, ...styles.registerButton }} onClick={handleRegister}>Create new account</button>
            </div>
        </div>
    );
}

export default Login;