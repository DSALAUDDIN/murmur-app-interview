// /src/components/CreateMurmurForm.tsx
import { useState } from 'react';
import api from '../services/api';

interface Murmur {
  id: number;
  text: string;
  createdAt: string;
  user: { id: number; username: string };
  likeCount: number;
  isLikedByMe: boolean;
}

interface CreateMurmurFormProps {
  onMurmurPosted: (newMurmur: Murmur) => void;
}

export default function CreateMurmurForm({ onMurmurPosted }: CreateMurmurFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Murmur cannot be empty.');
      return;
    }
    setError(null);

    try {
      const response = await api.post('/me/murmurs', { text });
      onMurmurPosted(response.data);
      setText('');
    } catch (err) {
      setError('Failed to post murmur. Please try again.');
      console.error(err);
    }
  };

  const styles = {
    form: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '24px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      border: '1px solid #E1DFDA',
    },
    textarea: {
      width: '100%',
      minHeight: '80px',
      border: '1px solid #E1DFDA',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '16px',
      color: '#4B4E6D',
      resize: 'vertical' as 'vertical',
      boxSizing: 'border-box' as 'border-box',
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: '12px',
    },
    charCount: {
      marginRight: '16px',
      color: text.length > 280 ? '#C73E3A' : '#A8A9AD',
      fontSize: '14px',
    },
    button: {
      padding: '8px 24px',
      fontSize: '14px',
      fontWeight: 600,
      color: 'white',
      backgroundColor: '#C73E3A',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    disabledButton: {
      backgroundColor: '#A8A9AD',
      cursor: 'not-allowed',
    },
    errorMessage: {
      color: '#C73E3A',
      fontSize: '14px',
      marginTop: '8px',
    },
  };

  const isButtonDisabled = !text.trim() || text.length > 280;

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <textarea
        style={styles.textarea}
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={styles.footer}>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <span style={styles.charCount}>{text.length}/280</span>
        <button
          type="submit"
          disabled={isButtonDisabled}
          style={{ ...styles.button, ...(isButtonDisabled ? styles.disabledButton : {}) }}
        >
          Murmur
        </button>
      </div>
    </form>
  );
}
