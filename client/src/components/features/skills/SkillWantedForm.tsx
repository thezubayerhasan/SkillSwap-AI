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

interface SkillWantedFormProps {
  editingItem: SkillWanted | null;
  onDone: () => void;
}

const CATEGORIES = [
  'Programming',
  'Design',
  'Music',
  'Language',
  'Math',
  'Writing',
  'Video Editing',
  'Tutoring',
  'Other',
];

const SkillWantedForm = ({ editingItem, onDone }: SkillWantedFormProps) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'medium',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setForm({
        title: editingItem.title,
        description: editingItem.description ?? '',
        category: editingItem.category ?? '',
        urgency: editingItem.urgency,
      });
    } else {
      setForm({
        title: '',
        description: '',
        category: '',
        urgency: 'medium',
      });
    }
  }, [editingItem]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        urgency: form.urgency,
      };

      if (editingItem) {
        await skillWantedService.update(editingItem._id, payload);
        toast.success('Updated!');
      } else {
        await skillWantedService.create(payload);
        toast.success('Skill need added!');
      }

      onDone();
    } catch {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8, marginBottom: 24 }}
    >
      <h2>{editingItem ? 'Edit Skill Need' : 'Add Skill You Need'}</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Title *</label>
        <br />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g. Graphic Design"
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Description</label>
        <br />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what you need help with..."
          rows={3}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <label>Category</label>
          <br />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label>Urgency</label>
          <br />
          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '8px 20px', cursor: 'pointer' }}
        >
          {loading ? 'Saving...' : editingItem ? 'Update' : 'Add Need'}
        </button>

        {editingItem && (
          <button
            type="button"
            onClick={onDone}
            style={{ padding: '8px 20px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default SkillWantedForm;