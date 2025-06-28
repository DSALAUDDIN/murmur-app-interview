import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import MurmurCard from '../components/MurmurCard';

interface Murmur {
  id: number;
  text: string;
  createdAt: string;
  user: { id: number; username: string };
  likeCount: number;
  isLikedByMe: boolean;
}

export default function MurmurDetailPage() {
  const { murmurId } = useParams<{ murmurId: string }>();
  const [murmur, setMurmur] = useState<Murmur | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!murmurId) return;
    api.get(`/murmurs/${murmurId}`)
      .then(res => setMurmur(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [murmurId]);

  const handleLikeToggle = async (murmurId: number, newIsLiked: boolean) => {
    if (!murmur) return;
    setMurmur(prevMurmur => prevMurmur ? {
      ...prevMurmur,
      isLikedByMe: newIsLiked,
      likeCount: newIsLiked ? prevMurmur.likeCount + 1 : prevMurmur.likeCount - 1,
    } : null);
    try {
      if (newIsLiked) await api.post(`/murmurs/${murmurId}/like`);
      else await api.delete(`/murmurs/${murmurId}/unlike`);
    } catch (err) { console.error('Like toggle failed:', err); }
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading murmur...</div>;
  if (!murmur) return <div style={{textAlign: 'center', marginTop: '50px'}}>Murmur not found.</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '24px auto' }}>
      <MurmurCard murmur={murmur} onLikeToggle={handleLikeToggle} />
    </div>
  );
}
