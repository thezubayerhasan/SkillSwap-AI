import { useEffect, useState } from 'react';
import { walletService } from '../services/walletService';

const Wallet = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<unknown[]>([]);

  useEffect(() => {
    walletService.getBalance()
      .then(res => setBalance(res.data.balance ?? 0))
      .catch(console.error);
    walletService.getTransactions()
      .then(res => setTransactions(res.data.transactions ?? []))
      .catch(console.error);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <h1>Wallet</h1>
      <p><strong>Balance:</strong> {balance !== null ? `${balance} credits` : 'Loading...'}</p>
      <h2>Transactions</h2>
      {transactions.length === 0 ? <p>No transactions yet.</p> : <p>{transactions.length} transactions.</p>}
    </div>
  );
};

export default Wallet;
