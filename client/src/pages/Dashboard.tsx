import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <h1>Dashboard</h1>
      {user && <p>Welcome back, {user.name}!</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
        <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
          <h3>Wallet Balance</h3>
          <p>{user?.walletBalance ?? 0} credits</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
          <h3>Trust Score</h3>
          <p>{user?.trustScore ?? 0}</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
          <h3>Active Exchanges</h3>
          <p>— coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
