import React, { useEffect, useState } from "react";
import { skillService } from "SkillSwapAI/client/src/services/skillService";
import SkillCard from "SkillSwapAI/client/src/components/features/skills/SkillCard";
import SkillDetailModal from "SkillSwapAI/client/src/components/features/skills/SkillDetailModal";

interface Skill {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level: string;
  tags: string[];
  user: { _id: string; name: string };
}

const SkillDiscovery = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  useEffect(() => {
    skillService.getAll().then((res) => {
      setSkills(res.data.skills);
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Skill Discovery</h1>

      <div style={{ display: "grid", gap: 16 }}>
        {skills.map((skill) => (
          <SkillCard
            key={skill._id}
            skill={skill}
            onViewDetail={setSelectedSkillId}
          />
        ))}
      </div>

      <SkillDetailModal
        skillId={selectedSkillId}
        onClose={() => setSelectedSkillId(null)}
      />
    </div>
  );
};

export default SkillDiscovery;