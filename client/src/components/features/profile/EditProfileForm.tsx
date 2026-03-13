import { useState } from 'react';
import { profileService } from '../../../services/profileService';
import { useAuth } from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

interface EditProfileFormProps {
  onDone: () => void;
}

const EditProfileForm = ({ onDone }: EditProfileFormProps) => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    bio: user?.bio ?? '',
    university: user?.university ?? '',
    avatarUrl: user?.avatarUrl ?? '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setLoading(true);
    try {
      const res = await profileService.updateProfile({
        name: form.name.trim(),
        bio: form.bio.trim(),
        university: form.university.trim(),
        avatarUrl: form.avatarUrl.trim(),
      });
      setUser(prev => prev ? { ...prev, ...res.data.user } : prev);
      toast.success('Profile updated!');
      onDone();
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8, marginBottom: 24 }}>
      <h2>Edit Profile</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Name *</label><br />
        <input name="name" value={form.name} onChange={handleChange} required
          style={{ width: '100%', padding: 8, marginTop: 4 }} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>University</label><br />
        <input name="university" value={form.university} onChange={handleChange} placeholder="Your university"
          style={{ width: '100%', padding: 8, marginTop: 4 }} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Bio</label><br />
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell others about yourself..."
          rows={4} maxLength={500} style={{ width: '100%', padding: 8, marginTop: 4 }} />
        <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0' }}>{form.bio.length}/500</p>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Avatar URL</label><br />
        <input name="avatarUrl" value={form.avatarUrl} onChange={handleChange} placeholder="https://..."
          style={{ width: '100%', padding: 8, marginTop: 4 }} />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={loading} style={{
          padding: '8px 20px', cursor: 'pointer', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6,
        }}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={onDone} style={{ padding: '8px 20px', cursor: 'pointer', borderRadius: 6 }}>Cancel</button>
      </div>
    </form>
  );
};

export default EditProfileForm;
