// /src/pages/RegisterPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Design System Colors
const colors = {
  primaryAccent: '#C73E3A',
  primaryText: '#4B4E6D',
  secondaryText: '#A8A9AD',
  background: '#EFE7DA',
  border: '#E1DFDA',
  buttonHover: '#A8322E',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await api.post('/auth/register', { username, email, password });
      setSuccess('Registration successful! Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        // Handle specific error messages from the backend (e.g., validation, conflict)
        const messages = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(', ')
          : err.response.data.message;
        setError(messages);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Registration failed:', err);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      backgroundColor: colors.background,
      color: colors.primaryText,
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      width: '300px',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: '24px',
      fontWeight: 700,
      textAlign: 'center' as 'center',
      marginBottom: '24px',
    },
    input: {
      padding: '12px',
      marginBottom: '16px',
      fontSize: '14px',
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
      color: colors.primaryText,
    },
    button: {
      padding: '12px',
      fontSize: '16px',
      fontWeight: 600,
      color: 'white',
      backgroundColor: colors.primaryAccent,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    message: {
      textAlign: 'center' as 'center',
      marginTop: '16px',
    },
    errorMessage: {
      color: colors.primaryAccent,
    },
    successMessage: {
      color: '#A8C686',
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Create your Murmur account</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
        {error && <p style={{...styles.message, ...styles.errorMessage}}>{error}</p>}
        {success && <p style={{...styles.message, ...styles.successMessage}}>{success}</p>}
      </form>
    </div>
  );
}
