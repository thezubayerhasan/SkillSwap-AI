import { useEffect, useState } from "react";
import MatchCard from "../components/features/matching/MatchCard";
import { matchService } from "../services/matchService";

interface Match {
  user: {
    _id: string;
    name: string;
    university?: string;
  };
  theyHaveWhatIWant: boolean;
  iHaveWhatTheyWant: boolean;
  matchScore?: number;
  matchedSkills?: string[];
  matchedNeeds?: string[];
}

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    matchService
      .getMatches()
      .then((res) => setMatches(res.data.matches ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleRequestExchange = (userId: string) => {
    alert("Exchange requested with " + userId);
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1>My Matches</h1>

      {loading ? (
        <p>Loading matches...</p>
      ) : matches.length === 0 ? (
        <p>No matches found yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {matches.map((match) => (
            <MatchCard
              key={match.user._id}
              match={match}
              onRequestExchange={handleRequestExchange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
