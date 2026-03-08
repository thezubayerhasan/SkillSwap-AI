import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ maxWidth: 800, margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
      <h1>Welcome to SkillSwap AI</h1>
      <p>Exchange skills with students at your university using AI-powered matching.</p>
      <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
        <Link to="/register">
          <button style={{ padding: '10px 24px', cursor: 'pointer' }}>Get Started</button>
        </Link>
        <Link to="/login">
          <button style={{ padding: '10px 24px', cursor: 'pointer' }}>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
