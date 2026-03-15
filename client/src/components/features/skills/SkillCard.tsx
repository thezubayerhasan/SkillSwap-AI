import React from "react";

interface SkillCardProps {
  skill: {
    _id: string;
    title: string;
    description?: string;
    category?: string;
    level: string;
    tags: string[];
    user: { _id: string; name: string; university?: string; avatarUrl?: string };
  };
  onViewDetail: (id: string) => void;
}

const SkillCard = ({ skill, onViewDetail }: SkillCardProps) => {
  return (
    <div
      onClick={() => onViewDetail(skill._id)}
      style={{
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#e0e7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            marginRight: 8,
          }}
        >
          {skill.user?.avatarUrl ? (
            <img
              src={skill.user.avatarUrl}
              style={{ width: 32, height: 32, borderRadius: "50%" }}
            />
          ) : (
            skill.user?.name?.charAt(0).toUpperCase()
          )}
        </div>

        <div>
          <div style={{ fontWeight: 500 }}>{skill.user?.name}</div>
          {skill.user?.university && (
            <div style={{ fontSize: 12 }}>{skill.user.university}</div>
          )}
        </div>
      </div>

      <h3>{skill.title}</h3>

      {skill.description && <p>{skill.description}</p>}

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {skill.category && <span>{skill.category}</span>}
        <span>{skill.level}</span>

        {skill.tags?.slice(0, 3).map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;