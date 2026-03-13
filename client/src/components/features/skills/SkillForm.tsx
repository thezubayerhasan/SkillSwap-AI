import { useEffect, useState } from 'react';
import { skillService } from '../../../services/skillService';
import toast from 'react-hot-toast';

interface SkillFormData {
  title: string;
  description: string;
  category: string;
  level: string;
  tags: string;
}

interface Skill {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level: string;
  tags: string[];
}

interface SkillFormProps {
  editingSkill: Skill | null;
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

const LEVELS = ['beginner', 'intermediate', 'advanced'];

const SkillForm = ({ editingSkill, onDone }: SkillFormProps) => {
  const [form, setForm] = useState<SkillFormData>({
    title: '',
    description: '',
    category: '',
    level: 'intermediate',
    tags: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingSkill) {
      setForm({
        title: editingSkill.title,
        description: editingSkill.description ?? '',
        category: editingSkill.category ?? '',
        level: editingSkill.level,
        tags: editingSkill.tags.join(', '),
      });
    } else {
      setForm({
        title: '',
        description: '',
        category: '',
        level: 'intermediate',
        tags: '',
      });
    }
  }, [editingSkill]);

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
        level: form.level,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingSkill) {
        await skillService.update(editingSkill._id, payload);
        toast.success('Skill updated!');
      } else {
        await skillService.create(payload);
        toast.success('Skill created!');
      }

      onDone();
    } catch {
      toast.error(editingSkill ? 'Failed to update skill' : 'Failed to create skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8, marginBottom: 24 }}
    >
      <h2>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Title *</label>
        <br />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g. Python Programming"
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
          placeholder="Describe what you can teach..."
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
          <label>Level</label>
          <br />
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Tags (comma-separated)</label>
        <br />
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="react, javascript, web"
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '8px 20px', cursor: 'pointer' }}
        >
          {loading ? 'Saving...' : editingSkill ? 'Update Skill' : 'Create Skill'}
        </button>

        {editingSkill && (
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

export default SkillForm;