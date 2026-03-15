<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { matchService } from '../services/matchService';

const Matches = () => {
  const [matches, setMatches] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    matchService.getMatches()
      .then(res => setMatches(res.data.matches ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <h1>My Matches</h1>
      {loading ? <p>Loading matches...</p> : (
        matches.length === 0
          ? <p>No matches found yet.</p>
          : <p>{matches.length} matches found.</p>
      )}
=======
import React, { useEffect, useState } from "react";
import { matchService } from "SkillSwapAI/client/src/services/matchService";
import MatchCard from "SkillSwapAI/client/src/components/features/matching/MatchCard";

interface Match {
  user: {
    _id: string;
    name: string;
  };
  theyHaveWhatIWant: boolean;
  iHaveWhatTheyWant: boolean;
}

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    matchService.getMatches().then((res) => {
      setMatches(res.data.matches);
    });
  }, []);

  const handleRequestExchange = (userId: string) => {
    alert("Exchange requested with " + userId);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Matches</h1>

      <div style={{ display: "grid", gap: 16 }}>
        {matches.map((match) => (
          <MatchCard
            key={match.user._id}
            match={match}
            onRequestExchange={handleRequestExchange}
          />
        ))}
      </div>
>>>>>>> 895a522 (feat(F7): complete skill discovery with cards, search, filters, and detail modal)
    </div>
  );
};

<<<<<<< HEAD
export default Matches;
=======
export default Matches;
>>>>>>> 895a522 (feat(F7): complete skill discovery with cards, search, filters, and detail modal)
