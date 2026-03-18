import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { useAuth } from '../hooks/useAuth';
import MatchCard from '../components/features/matching/MatchCard';
import toast from 'react-hot-toast';

interface MatchUser {
  _id: string;
  name: string;
  university?: string;
  avatarUrl?: string;
  trustScore?: number;
}

interface Match {
  user: MatchUser;
  theyHaveWhatIWant: boolean;
  iHaveWhatTheyWant: boolean;
}

type FilterType = 'all' | 'mutual' | 'they-have' | 'i-have';

const Matches = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    if (!user) return;
    matchService.getMatches()
      .then(res => setMatches(res.data.matches ?? []))
      .catch(() => toast.error('Failed to load matches'))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRequestExchange = (userId: string) => {
    // Navigate to exchange page with partner pre-selected
    navigate(`/exchange?partner=${userId}`);
  };

  // Apply filter
  const filteredMatches = matches.filter(m => {
    if (filter === 'mutual') return m.theyHaveWhatIWant && m.iHaveWhatTheyWant;
    if (filter === 'they-have') return m.theyHaveWhatIWant;
    if (filter === 'i-have') return m.iHaveWhatTheyWant;
    return true;
  });

  // Sort: mutual matches first
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const aScore = (a.theyHaveWhatIWant ? 1 : 0) + (a.iHaveWhatTheyWant ? 1 : 0);
    const bScore = (b.theyHaveWhatIWant ? 1 : 0) + (b.iHaveWhatTheyWant ? 1 : 0);
    return bScore - aScore;
  });

  if (!user) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center' }}>
        <h1>My Matches</h1>
        <p>Please log in to see your matches.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 16px' }}>
      <h1>My Matches</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Students who match your skill offers and needs
      </p>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {([
          { key: 'all', label: 'All Matches' },
          { key: 'mutual', label: 'Mutual Matches' },
          { key: 'they-have', label: 'They Have What I Need' },
          { key: 'i-have', label: 'I Have What They Need' },
        ] as { key: FilterType; label: string }[]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '8px 16px', cursor: 'pointer', borderRadius: 20,
              border: filter === tab.key ? '2px solid #3b82f6' : '1px solid #ddd',
              background: filter === tab.key ? '#eff6ff' : 'white',
              fontWeight: filter === tab.key ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <p>Finding your matches...</p>
      ) : sortedMatches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ fontSize: 18 }}>No matches found yet.</p>
          <p style={{ color: '#888' }}>Make sure you've added your skills and skill needs.</p>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: 16, color: '#888' }}>
            {sortedMatches.length} match{sortedMatches.length !== 1 ? 'es' : ''} found
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {sortedMatches.map(match => (
              <MatchCard key={match.user._id} match={match} onRequestExchange={handleRequestExchange} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Matches;


