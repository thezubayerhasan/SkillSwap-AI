const AdminDashboard = () => {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
        <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
          <h3>Total Users</h3>
          <p>— coming soon</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
          <h3>Active Exchanges</h3>
          <p>— coming soon</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
          <h3>Open Disputes</h3>
          <p>— coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
