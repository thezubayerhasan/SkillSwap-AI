import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import EditProfileForm from '../components/features/profile/EditProfileForm';
import PublicProfile from '../components/features/profile/PublicProfile';

const Profile = () => {
  const { id } = useParams<{ id?: string }>();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  // If an ID is provided and it's NOT the logged-in user, show public profile
  const isOwnProfile = !id || id === user?._id;

  if (!isOwnProfile && id) {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
        <PublicProfile userId={id} />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center' }}>
        <h1>Profile</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>My Profile</h1>
        {!editing && (
          <button onClick={() => setEditing(true)} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: 6 }}>
            Edit Profile
          </button>
        )}
      </div>

      {editing ? (
        <EditProfileForm onDone={() => setEditing(false)} />
      ) : (
        <>
          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: '#e0e7ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontWeight: 'bold',
            }}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" style={{ width: 80, height: 80, borderRadius: '50%' }} />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h2 style={{ margin: '0 0 4px' }}>{user.name}</h2>
              {user.university && <p style={{ margin: 0, color: '#666' }}>{user.university}</p>}
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#888' }}>{user.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            <div style={{ padding: 12, background: '#f9fafb', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold' }}>{user.walletBalance}</div>
              <div style={{ fontSize: 13, color: '#888' }}>Credits</div>
            </div>
            <div style={{ padding: 12, background: '#f9fafb', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold' }}>{user.trustScore ?? 50}</div>
              <div style={{ fontSize: 13, color: '#888' }}>Trust Score</div>
            </div>
            <div style={{ padding: 12, background: '#f9fafb', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold' }}>{user.role}</div>
              <div style={{ fontSize: 13, color: '#888' }}>Role</div>
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: 16 }}>
            <h3>Bio</h3>
            <p style={{ color: '#666' }}>{user.bio || 'No bio yet. Click "Edit Profile" to add one.'}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
