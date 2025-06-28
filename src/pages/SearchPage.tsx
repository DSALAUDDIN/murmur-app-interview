// /src/pages/SearchPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: number;
  username: string;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/search?q=${query}`);
        setResults(response.data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const styles = {
    container: { maxWidth: '600px', margin: '24px auto', padding: '0 16px' },
    title: { fontSize: '24px', fontWeight: 700, color: '#4B4E6D', marginBottom: '24px' },
    message: { textAlign: 'center' as 'center', color: '#A8A9AD' },
    resultItem: { backgroundColor: 'white', padding: '16px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', border: '1px solid #E1DFDA' },
    usernameLink: { textDecoration: 'none', color: '#4B4E6D', fontWeight: 600 }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Search Results for "{query}"</h1>
      {loading && <p style={styles.message}>Searching...</p>}
      {!loading && results.length > 0 && (
        <div>
          {results.map(user => (
            <div key={user.id} style={styles.resultItem}>
              <Link to={`/profile/${user.id}`} style={styles.usernameLink}>
                {user.username}
              </Link>
            </div>
          ))}
        </div>
      )}
      {!loading && results.length === 0 && (
        <p style={styles.message}>No users found.</p>
      )}
    </div>
  );
}
