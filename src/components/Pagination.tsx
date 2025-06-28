// /src/components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '24px',
    },
    button: {
      padding: '8px 16px',
      margin: '0 8px',
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
    pageInfo: {
      color: '#4B4E6D',
      fontWeight: 600,
    },
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  if (lastPage <= 1) {
    return null;
  }

  return (
    <div style={styles.container}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        style={{
          ...styles.button,
          ...(currentPage === 1 ? styles.disabledButton : {}),
        }}
      >
        Previous
      </button>
      <span style={styles.pageInfo}>
        Page {currentPage} of {lastPage}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === lastPage}
        style={{
          ...styles.button,
          ...(currentPage === lastPage ? styles.disabledButton : {}),
        }}
      >
        Next
      </button>
    </div>
  );
}
