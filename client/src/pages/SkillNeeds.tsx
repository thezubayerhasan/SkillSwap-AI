import { useState } from 'react';
import SkillWantedForm from '../components/features/skills/SkillWantedForm';
import MySkillsWanted from '../components/features/skills/MySkillsWanted';

const SkillNeeds = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDone = () => {
    setEditingItem(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Skills Needed</h1>

      <SkillWantedForm editingItem={editingItem} onDone={handleDone} />

      <MySkillsWanted
        onEdit={(item) => setEditingItem(item)}
        refreshKey={refreshKey}
      />
    </div>
  );
};

export default SkillNeeds;