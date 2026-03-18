
interface Transaction {
  _id: string;
  type: 'credit' | 'debit';
  amount: number;
  description?: string;
  balanceAfter?: number;
  createdAt: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  if (transactions.length === 0) {
    return <p style={{ textAlign: 'center', padding: 24, color: '#888' }}>No transactions yet.</p>;
  }

  return (
    <div>
      {transactions.map(tx => (
        <div key={tx._id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px', borderBottom: '1px solid #f3f4f6',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: tx.type === 'credit' ? '#d1fae5' : '#fee2e2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 'bold',
              color: tx.type === 'credit' ? '#065f46' : '#991b1b',
            }}>
              {tx.type === 'credit' ? '+' : '-'}
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{tx.description ?? (tx.type === 'credit' ? 'Credit received' : 'Credit spent')}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{new Date(tx.createdAt).toLocaleDateString()} · {new Date(tx.createdAt).toLocaleTimeString()}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600, color: tx.type === 'credit' ? '#10b981' : '#ef4444' }}>
              {tx.type === 'credit' ? '+' : '-'}{tx.amount} credit{tx.amount !== 1 ? 's' : ''}
            </div>
            {tx.balanceAfter != null && (
              <div style={{ fontSize: 12, color: '#888' }}>Balance: {tx.balanceAfter}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
