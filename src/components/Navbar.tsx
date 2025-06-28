import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notifications from './Notifications';

export default function Navbar() {
  const { isAuthenticated, logout, userId } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
      setSearchQuery('');
    }
  };

  const styles = {
    nav: { padding: '16px 24px', backgroundColor: 'white', borderBottom: '1px solid #E1DFDA', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', },
    navLink: { color: '#4B4E6D', textDecoration: 'none', marginRight: '20px', fontWeight: 600, },
    navLinksContainer: { display: 'flex', alignItems: 'center' },
    logoutButton: { color: '#4B4E6D', textDecoration: 'none', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1em', fontFamily: 'inherit', },
    searchForm: { display: 'flex' },
    searchInput: { padding: '6px 10px', fontSize: '14px', borderRadius: '8px', border: '1px solid #E1DFDA', color: '#4B4E6D', },
    searchButton: { marginLeft: '8px', padding: '6px 12px', color: 'white', backgroundColor: '#C73E3A', border: 'none', borderRadius: '8px', cursor: 'pointer', }
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.navLink}>Murmur</Link>
      </div>
      {isAuthenticated && (
        <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
          <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput}/>
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
      )}
      <div style={styles.navLinksContainer}>
        {isAuthenticated ? (
          <>
            <Link to="/" style={styles.navLink}>Timeline</Link>
            <Link to="/discover" style={styles.navLink}>Discover</Link>
            <Link to={`/profile/${userId}`} style={styles.navLink}>My Profile</Link>
            <Notifications />
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.navLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
