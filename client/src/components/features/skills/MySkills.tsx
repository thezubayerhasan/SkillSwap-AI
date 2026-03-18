import { useEffect, useState } from 'react';
import { skillService } from '../../../services/skillService';
import { useAuth } from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

interface Skill {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level: string;
  tags: string[];
  isActive: boolean;
}

interface MySkillsProps {
  onEdit: (skill: Skill) => void;
  refreshKey: number;
}

const MySkills = ({ onEdit, refreshKey }: MySkillsProps) => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMySkills = async () => {
    try {
      const res = await skillService.getAll();
      const mySkills = (res.data.skills ?? []).filter(
        (s: Skill & { user: { _id: string } | string }) => {
          const ownerId = typeof s.user === 'string' ? s.user : s.user._id;
          return ownerId === user?._id;
        }
      );
      setSkills(mySkills);
    } catch {
      toast.error('Failed to load your skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMySkills();
  }, [user, refreshKey]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
 feature/skill-offer-management-F4


 main
    try {
      await skillService.delete(id);
      toast.success('Skill deleted');
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch {
      toast.error('Failed to delete skill');
    }
  };

  if (loading) return <p>Loading your skills...</p>;
feature/skill-offer-management-F4
  if (skills.length === 0) return <p>You haven't added any skills yet.</p>;

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}
    >
      {skills.map((skill) => (
        <div key={skill._id} style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>

  if (skills.length === 0) return <p>You haven&apos;t added any skills yet.</p>;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      {skills.map((skill) => (
        <div
          key={skill._id}
          style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}
        >
 main
          <h3 style={{ margin: '0 0 8px' }}>{skill.title}</h3>

          {skill.description && (
            <p style={{ margin: '0 0 8px', color: '#666' }}>{skill.description}</p>
          )}

          <div style={{ display: 'flex', gap: 8, fontSize: 14, marginBottom: 8 }}>
            {skill.category && (
 feature/skill-offer-management-F4
              <span style={{ background: '#e0e7ff', padding: '2px 8px', borderRadius: 4 }}>
                {skill.category}
              </span>
            )}
            <span style={{ background: '#d1fae5', padding: '2px 8px', borderRadius: 4 }}>

              <span
                style={{
                  background: '#e0e7ff',
                  padding: '2px 8px',
                  borderRadius: 4,
                }}
              >
                {skill.category}
              </span>
            )}
            <span
              style={{
                background: '#d1fae5',
                padding: '2px 8px',
                borderRadius: 4,
              }}
            >
 main
              {skill.level}
            </span>
          </div>

          {skill.tags.length > 0 && (
 feature/skill-offer-management-F4
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
              {skill.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}

            <div
              style={{
                display: 'flex',
                gap: 4,
                flexWrap: 'wrap',
                marginBottom: 8,
              }}
            >
              {skill.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    background: '#f3f4f6',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: 12,
                  }}
 main
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onEdit(skill)}
              style={{ padding: '6px 12px', cursor: 'pointer' }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(skill._id)}
              style={{ padding: '6px 12px', cursor: 'pointer', color: 'red' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MySkills;