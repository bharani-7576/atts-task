import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Temporary hardcoded credentials for testing
  const tempCredentials = {
    email: 'admin',
    password: 'password'
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if credentials match the temporary ones for testing
    if (email === tempCredentials.email && password === tempCredentials.password) {
      // Simulate API delay
      setTimeout(() => {
        localStorage.setItem('token', 'temp-token-for-testing');
        setMessage('Login successful!');
        setTimeout(() => navigate('/product-form'), 1000);
        setIsLoading(false);
      }, 800);
      return;
    }
    
    // If not using temp credentials, try the actual API
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      setTimeout(() => navigate('/product-form'), 1000);
    } catch (err) {
      setMessage('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <div className="login-card" style={styles.card}>
        <h2 style={styles.heading}>Welcome Back</h2>
        <p style={styles.subheading}>Please sign in to your account</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Username</label>
            <input
              type="text"
              id="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
          
          <div style={styles.tempCredentialsNote}>
            <p style={styles.noteText}>Temporary credentials: admin / password</p>
          </div>
          
          <div style={styles.forgotPassword}>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div>
          
          <button 
            type="submit" 
            style={isLoading ? {...styles.button, ...styles.buttonLoading} : styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
          
          {message && (
            <div style={
              message.includes('successful') 
                ? {...styles.message, ...styles.successMessage} 
                : {...styles.message, ...styles.errorMessage}
            }>
              {message}
            </div>
          )}
        </form>
        
        <div style={styles.footer}>
          <p>Don't have an account? <a href="#" style={styles.link}>Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box'
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    backdropFilter: 'blur(10px)'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '5px',
    fontSize: '28px',
    fontWeight: '600'
  },
  subheading: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '25px',
    fontSize: '16px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555'
  },
  input: {
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
    transition: 'border 0.3s ease',
    outline: 'none',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    ':focus': {
      border: '1px solid #a777e3'
    }
  },
  tempCredentialsNote: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    border: '1px solid #ffc107',
    borderRadius: '5px',
    padding: '8px 12px',
    marginTop: '-10px'
  },
  noteText: {
    color: '#856404',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center'
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: '14px'
  },
  button: {
    padding: '14px',
    backgroundColor: '#6e8efb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px'
  },
  buttonLoading: {
    backgroundColor: '#94a7f8',
    cursor: 'not-allowed'
  },
  message: {
    textAlign: 'center',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '15px',
    fontSize: '14px'
  },
  successMessage: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid #4CAF50',
    color: '#4CAF50'
  },
  errorMessage: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    border: '1px solid #F44336',
    color: '#F44336'
  },
  link: {
    color: '#6e8efb',
    textDecoration: 'none',
    fontWeight: '600'
  },
  footer: {
    textAlign: 'center',
    marginTop: '25px',
    fontSize: '14px',
    color: '#666'
  }
};

export default Login;