import { useEffect, useState } from 'react';
import { skillWantedService } from '../../../services/skillWantedService';
import toast from 'react-hot-toast';

interface SkillWanted {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  urgency: string;
}

interface MySkillsWantedProps {
  onEdit: (item: SkillWanted) => void;
  refreshKey: number;
}

const urgencyColors: Record<string, string> = {
  low: '#d1fae5',
  medium: '#fef3c7',
  high: '#fee2e2',
};

const MySkillsWanted = ({ onEdit, refreshKey }: MySkillsWantedProps) => {
  const [items, setItems] = useState<SkillWanted[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    skillWantedService.getMine()
      .then(res => setItems(res.data.skillsWanted ?? []))
      .catch(() => toast.error('Failed to load your skill needs'))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this skill need?')) return;
    try {
      await skillWantedService.delete(id);
      toast.success('Deleted');
      setItems(prev => prev.filter(i => i._id !== id));
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <p>Loading your skill needs...</p>;
  if (items.length === 0) return <p>You haven't added any skill needs yet.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {items.map(item => (
        <div key={item._id} style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
          <h3 style={{ margin: '0 0 8px' }}>{item.title}</h3>
          {item.description && <p style={{ margin: '0 0 8px', color: '#666' }}>{item.description}</p>}
          <div style={{ display: 'flex', gap: 8, fontSize: 14, marginBottom: 8 }}>
            {item.category && <span style={{ background: '#e0e7ff', padding: '2px 8px', borderRadius: 4 }}>{item.category}</span>}
            <span style={{ background: urgencyColors[item.urgency] ?? '#f3f4f6', padding: '2px 8px', borderRadius: 4 }}>
              {item.urgency} urgency
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onEdit(item)} style={{ padding: '6px 12px', cursor: 'pointer' }}>Edit</button>
            <button onClick={() => handleDelete(item._id)} style={{ padding: '6px 12px', cursor: 'pointer', color: 'red' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MySkillsWanted;