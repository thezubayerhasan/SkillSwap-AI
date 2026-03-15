import React, { useEffect, useState } from "react";
import { skillService } from "SkillSwapAI/client/src/services/skillService";

interface SkillDetail {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level: string;
  tags: string[];
  createdAt: string;
  user: {
    _id: string;
    name: string;
    university?: string;
    avatarUrl?: string;
    trustScore?: number;
  };
}

interface SkillDetailModalProps {
  skillId: string | null;
  onClose: () => void;
}

const SkillDetailModal = ({ skillId, onClose }: SkillDetailModalProps) => {
  const [skill, setSkill] = useState<SkillDetail | null>(null);

  useEffect(() => {
    if (!skillId) return;

    skillService.getById(skillId).then((res) => {
      setSkill(res.data.skill);
    });
  }, [skillId]);

  if (!skillId) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: 24,
          borderRadius: 10,
          maxWidth: 500,
        }}
      >
        {!skill ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{skill.title}</h2>

            {skill.description && <p>{skill.description}</p>}

            <p>Level: {skill.level}</p>

            {skill.category && <p>Category: {skill.category}</p>}

            <button onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillDetailModal;