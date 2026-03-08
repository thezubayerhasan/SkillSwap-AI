import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
