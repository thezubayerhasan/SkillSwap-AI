interface MatchUser {
  _id: string;
  name: string;
  university?: string;
}

interface MatchCardProps {
  match: {
    user: MatchUser;
    theyHaveWhatIWant: boolean;
    iHaveWhatTheyWant: boolean;
    matchScore?: number;
    matchedSkills?: string[];
    matchedNeeds?: string[];
  };
  onRequestExchange: (userId: string) => void;
}

const MatchCard = ({ match, onRequestExchange }: MatchCardProps) => {
  const { user } = match;

  return (
    <div
      style={{
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h3>{user.name}</h3>

      {user.university && <p>{user.university}</p>}

      <div style={{ marginBottom: 8, fontSize: 13 }}>
        {match.theyHaveWhatIWant && (
          <div style={{ color: "#10b981" }}>They have what you want</div>
        )}
        {match.iHaveWhatTheyWant && (
          <div style={{ color: "#3b82f6" }}>You have what they want</div>
        )}
      </div>

      {match.matchScore != null && (
        <div style={{ marginBottom: 8, fontSize: 13, color: "#888" }}>
          Match Score: <strong>{match.matchScore}</strong>
        </div>
      )}
      
      {match.matchedSkills && match.matchedSkills.length > 0 && (
        <div style={{ marginBottom: 4, fontSize: 13 }}>
          <span style={{ color: "#10b981" }}>Skills they offer you:</span>{" "}
          {match.matchedSkills.join(", ")}
        </div>
      )}
      {match.matchedNeeds && match.matchedNeeds.length > 0 && (
        <div style={{ marginBottom: 8, fontSize: 13 }}>
          <span style={{ color: "#3b82f6" }}>Skills you can teach them:</span>{" "}
          {match.matchedNeeds.join(", ")}
        </div>
      )}

      <button onClick={() => onRequestExchange(user._id)}>
        Request Exchange
      </button>
    </div>
  );
};

export default MatchCard;