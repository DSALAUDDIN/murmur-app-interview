// /src/components/MurmurCard.tsx
import { Link } from 'react-router-dom';

interface Murmur {
  id: number;
  text: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
  likeCount: number;
  isLikedByMe: boolean;
}

interface MurmurCardProps {
  murmur: Murmur;
  onLikeToggle: (murmurId: number, isLiked: boolean) => void;
}

export default function MurmurCard({ murmur, onLikeToggle }: MurmurCardProps) {
  const styles = {
    card: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '16px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      border: '1px solid #E1DFDA',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
    },
    username: {
      fontWeight: 700,
      fontSize: '16px',
      color: '#4B4E6D',
    },
    timestamp: {
      marginLeft: '8px',
      fontSize: '12px',
      color: '#A8A9AD',
    },
    text: {
      fontSize: '14px',
      color: '#4B4E6D',
      lineHeight: 1.5,
      margin: '0 0 16px 0',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
    },
    likeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: murmur.isLikedByMe ? '#C73E3A' : '#A8A9AD',
    },
    likeIcon: {
      marginRight: '4px',
    },
    likeCount: {
      color: '#4B4E6D',
    },
  };

  const handleLikeClick = () => {
    onLikeToggle(murmur.id, !murmur.isLikedByMe);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <Link to={`/profile/${murmur.user.id}`} style={{ textDecoration: 'none' }}>
          <span style={styles.username}>{murmur.user.username}</span>
        </Link>
        <span style={styles.timestamp}>
          {new Date(murmur.createdAt).toLocaleString()}
        </span>
      </div>
      <p style={styles.text}>{murmur.text}</p>
      <div style={styles.footer}>
        <button onClick={handleLikeClick} style={styles.likeButton}>
          <svg style={styles.likeIcon} width="16" height="16" viewBox="0 0 24 24" fill={murmur.isLikedByMe ? '#C73E3A' : 'none'} stroke={murmur.isLikedByMe ? '#C73E3A' : '#A8A9AD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span style={styles.likeCount}>{murmur.likeCount}</span>
        </button>
      </div>
    </div>
  );
}
