import { useEffect, useState } from 'react';
import { exchangeService } from '../services/exchangeService';

const Exchange = () => {
  const [exchanges, setExchanges] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    exchangeService.getAll()
      .then(res => setExchanges(res.data.exchanges ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <h1>Exchanges</h1>
      {loading ? <p>Loading exchanges...</p> : (
        exchanges.length === 0
          ? <p>No exchanges yet.</p>
          : <p>{exchanges.length} exchanges.</p>
      )}
    </div>
  );
};

export default Exchange;
