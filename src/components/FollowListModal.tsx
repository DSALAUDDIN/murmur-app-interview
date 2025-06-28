// /src/components/FollowListModal.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: number;
  username: string;
}

interface FollowListModalProps {
  userId: number;
  type: 'following' | 'followers';
  onClose: () => void;
}

export default function FollowListModal({ userId, type, onClose }: FollowListModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/users/${userId}/${type}`)
      .then(res => setUsers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId, type]);

  const styles = {
    overlay: {
      position: 'fixed' as 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      width: '400px',
      maxHeight: '80vh',
      overflowY: 'auto' as 'auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #E1DFDA',
      paddingBottom: '12px',
      marginBottom: '12px',
    },
    title: {
      fontSize: '20px',
      color: '#4B4E6D',
      margin: 0,
      fontWeight: 700,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#A8A9AD',
    },
    userItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #E1DFDA',
    },
    usernameLink: {
      textDecoration: 'none',
      color: '#4B4E6D',
      fontWeight: 600,
      fontSize: '16px',
    },
    message: {
      textAlign: 'center' as 'center',
      color: '#A8A9AD',
      padding: '20px 0',
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        {loading ? (
          <p style={styles.message}>Loading...</p>
        ) : (
          <div>
            {users.length > 0 ? (
              users.map(user => (
                <div key={user.id} style={styles.userItem}>
                  <Link to={`/profile/${user.id}`} onClick={onClose} style={styles.usernameLink}>
                    {user.username}
                  </Link>
                </div>
              ))
            ) : (
              <p style={styles.message}>No users to display.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
