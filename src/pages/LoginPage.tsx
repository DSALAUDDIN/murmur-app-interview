// /src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext'; // <-- Import the useAuth hook

const colors = {
  primaryAccent: '#C73E3A',
  primaryText: '#4B4E6D',
  background: '#EFE7DA',
  border: '#E1DFDA',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/auth/login', { email, password });

      login(response.data.accessToken);

      navigate('/');

    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
      console.error('Login failed:', err);
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
    errorMessage: {
      textAlign: 'center' as 'center',
      marginTop: '16px',
      color: colors.primaryAccent,
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Log in to Murmur</h1>
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
          Log In
        </button>
        {error && <p style={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}
