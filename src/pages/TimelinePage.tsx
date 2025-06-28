// /src/pages/TimelinePage.tsx
import { useState, useEffect } from 'react';
import api from '../services/api';
import MurmurCard from '../components/MurmurCard';
import Pagination from '../components/Pagination';
import CreateMurmurForm from '../components/CreateMurmurForm';

interface Murmur {
  id: number;
  text: string;
  createdAt: string;
  user: { id: number; username: string };
  likeCount: number;
  isLikedByMe: boolean;
}

export default function TimelinePage() {
  const [murmurs, setMurmurs] = useState<Murmur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalMurmurs, setTotalMurmurs] = useState(0);

  useEffect(() => {
    const fetchTimeline = async (page: number) => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/murmurs/timeline?page=${page}&limit=10`);
        setMurmurs(response.data.data);
        setCurrentPage(response.data.page);
        setLastPage(response.data.last_page);
        setTotalMurmurs(response.data.total);
      } catch (err) {
        setError('Failed to fetch timeline. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline(currentPage);
  }, [currentPage]);

  const handleLikeToggle = async (murmurId: number, newIsLiked: boolean) => {
    setMurmurs(currentMurmurs =>
      currentMurmurs.map(murmur =>
        murmur.id === murmurId
          ? { ...murmur, isLikedByMe: newIsLiked, likeCount: newIsLiked ? murmur.likeCount + 1 : murmur.likeCount - 1 }
          : murmur
      )
    );
    try {
      if (newIsLiked) {
        await api.post(`/murmurs/${murmurId}/like`);
      } else {
        await api.delete(`/murmurs/${murmurId}/unlike`);
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
      setMurmurs(currentMurmurs =>
        currentMurmurs.map(murmur =>
          murmur.id === murmurId
            ? { ...murmur, isLikedByMe: !newIsLiked, likeCount: newIsLiked ? murmur.likeCount - 1 : murmur.likeCount + 1 }
            : murmur
        )
      );
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMurmurPosted = (newMurmur: Murmur) => {
    setMurmurs(prevMurmurs => [newMurmur, ...prevMurmurs]);
    setTotalMurmurs(prevTotal => prevTotal + 1);
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '24px auto',
      padding: '0 16px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#4B4E6D',
      marginBottom: '24px',
    },
    message: {
      textAlign: 'center' as 'center',
      color: '#A8A9AD',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Home</h1>
      <CreateMurmurForm onMurmurPosted={handleMurmurPosted} />
      {loading && currentPage === 1 && <p style={styles.message}>Loading murmurs...</p>}
      {error && <p style={{ ...styles.message, color: '#C73E3A' }}>{error}</p>}
      {!loading && totalMurmurs === 0 && (
        <p style={styles.message}>Your timeline is empty. Follow some users or post a murmur!</p>
      )}
      <div>
        {murmurs.map((murmur) => (
          <MurmurCard key={murmur.id} murmur={murmur} onLikeToggle={handleLikeToggle} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
