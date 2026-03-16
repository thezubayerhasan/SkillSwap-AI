import { useEffect, useState } from 'react';
import { matchService } from '../services/matchService';

const Matches = () => {
  const [matches, setMatches] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    matchService.getMatches()
      .then(res => setMatches(res.data.matches ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <h1>My Matches</h1>
      {loading ? <p>Loading matches...</p> : (
        matches.length === 0
          ? <p>No matches found yet.</p>
          : <p>{matches.length} matches found.</p>
      )}
    </div>
  );
};

export default Matches;
