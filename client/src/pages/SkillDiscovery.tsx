import { FormEvent, useCallback, useEffect, useState } from "react";
import SkillCard from "../components/features/skills/SkillCard";
import SkillDetailModal from "../components/features/skills/SkillDetailModal";
import SkillForm from "../components/features/skills/SkillForm";
import MySkills from "../components/features/skills/MySkills";
import { useAuth } from "../hooks/useAuth";
import { skillService } from "../services/skillService";

interface Skill {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level: string;
  tags: string[];
  isActive: boolean;
  user: {
    _id: string;
    name: string;
    university?: string;
    avatarUrl?: string;
  };
}

interface EditableSkill {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level: string;
  tags: string[];
}

const SkillDiscovery = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<EditableSkill | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (level) params.level = level;

      const res = await skillService.getAll(params);
      setSkills(res.data.skills ?? []);
    } catch {
      console.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  }, [search, category, level]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSkills();
  };

  const handleFormDone = () => {
    setShowForm(false);
    setEditingSkill(null);
    setRefreshKey((prev) => prev + 1);
    fetchSkills();
  };

  const handleEdit = (skill: EditableSkill) => {
    setEditingSkill(skill);
    setShowForm(true);
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1>Skill Discovery</h1>

      {user && (
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h2>My Skills</h2>
            <button
              onClick={() => {
                setEditingSkill(null);
                setShowForm(!showForm);
              }}
              style={{ padding: "8px 16px", cursor: "pointer" }}
            >
              {showForm ? "Cancel" : "+ Add Skill"}
            </button>
          </div>

          {showForm && <SkillForm editingSkill={editingSkill} onDone={handleFormDone} />}
          <MySkills onEdit={handleEdit} refreshKey={refreshKey} />
        </div>
      )}

      <hr style={{ margin: "32px 0" }} />

      <h2>Browse All Skills</h2>

      <form
        onSubmit={handleSearchSubmit}
        style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          style={{ flex: 1, minWidth: 200, padding: 8 }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">All Categories</option>
          {[
            "Programming",
            "Design",
            "Music",
            "Language",
            "Math",
            "Writing",
            "Video Editing",
            "Tutoring",
            "Other",
          ].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading skills...</p>
      ) : skills.length === 0 ? (
        <p>No skills found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} onViewDetail={setSelectedSkillId} />
          ))}
        </div>
      )}

      <SkillDetailModal skillId={selectedSkillId} onClose={() => setSelectedSkillId(null)} />
    </div>
  );
};

export default SkillDiscovery;