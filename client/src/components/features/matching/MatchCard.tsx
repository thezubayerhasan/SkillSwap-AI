import React from "react";

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

      <button onClick={() => onRequestExchange(user._id)}>
        Request Exchange
      </button>
    </div>
  );
};

export default MatchCard;