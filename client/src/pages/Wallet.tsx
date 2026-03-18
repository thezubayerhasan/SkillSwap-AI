import { useEffect, useState } from 'react';
import { walletService } from '../services/walletService';
import { useAuth } from '../hooks/useAuth';
import BalanceCard from '../components/features/wallet/BalanceCard';
import TransactionList from '../components/features/wallet/TransactionList';
import toast from 'react-hot-toast';

interface Transaction {
  _id: string;
  type: 'credit' | 'debit';
  amount: number;
  description?: string;
  balanceAfter?: number;
  createdAt: string;
}

type FilterType = 'all' | 'credit' | 'debit';

const Wallet = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    if (!user) return;
    Promise.all([
      walletService.getBalance(),
      walletService.getTransactions(),
    ])
      .then(([balRes, txRes]) => {
        setBalance(balRes.data.balance ?? 0);
        setTransactions(txRes.data.transactions ?? []);
      })
      .catch(() => toast.error('Failed to load wallet data'))
      .finally(() => setLoading(false));
  }, [user]);

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(tx => tx.type === filter);

  if (!user) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center' }}>
        <h1>Wallet</h1><p>Please log in to view your wallet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <h1>Wallet</h1>

      {/* Balance Card */}
      <BalanceCard balance={balance} />

      {/* Transaction Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Transactions</h2>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['all', 'credit', 'debit'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '4px 12px', borderRadius: 16, cursor: 'pointer', fontSize: 13,
                border: filter === f ? '2px solid #3b82f6' : '1px solid #ddd',
                background: filter === f ? '#eff6ff' : 'white',
                fontWeight: filter === f ? 600 : 400,
              }}
            >
              {f === 'all' ? 'All' : f === 'credit' ? 'Earned' : 'Spent'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <>
          <p style={{ color: '#888', marginBottom: 12, fontSize: 14 }}>
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </p>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
            <TransactionList transactions={filteredTransactions} />
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
