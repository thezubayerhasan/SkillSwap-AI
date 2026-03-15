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
    </div>
  );
};

export default Matches;