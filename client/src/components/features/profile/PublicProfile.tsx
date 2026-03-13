
import { useEffect, useState } from 'react';
import { profileService } from '../../../services/profileService';

interface UserProfile {
  _id: string;
  name: string;
  university?: string;
  bio?: string;
  avatarUrl?: string;
  role: string;
  trustScore: number;
  walletBalance: number;
}

interface PublicProfileProps {
  userId: string;
}

const PublicProfile = ({ userId }: PublicProfileProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileService.getProfile(userId)
      .then(res => setProfile(res.data.user))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>User not found.</p>;

  return (
    <div>
      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: '#e0e7ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 'bold',
        }}>
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" style={{ width: 80, height: 80, borderRadius: '50%' }} />
          ) : (
            profile.name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <h2 style={{ margin: '0 0 4px' }}>{profile.name}</h2>
          {profile.university && <p style={{ margin: 0, color: '#666' }}>{profile.university}</p>}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 12, background: '#f9fafb', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>{profile.trustScore}</div>
          <div style={{ fontSize: 13, color: '#888' }}>Trust Score</div>
        </div>
        <div style={{ padding: 12, background: '#f9fafb', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>{profile.role}</div>
          <div style={{ fontSize: 13, color: '#888' }}>Role</div>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <div style={{ marginBottom: 24 }}>
          <h3>About</h3>
          <p style={{ color: '#666' }}>{profile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default PublicProfile;
