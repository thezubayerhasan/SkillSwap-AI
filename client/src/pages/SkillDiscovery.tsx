import { useEffect, useState } from 'react';
import { skillService } from '../services/skillService';

const SkillDiscovery = () => {
  const [skills, setSkills] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    skillService.getAll()
      .then(res => setSkills(res.data.skills ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <h1>Skill Discovery</h1>
      {loading ? <p>Loading skills...</p> : (
        skills.length === 0
          ? <p>No skills found yet.</p>
          : <p>{skills.length} skills available.</p>
      )}
    </div>
  );
};

export default SkillDiscovery;
