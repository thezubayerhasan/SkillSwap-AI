
interface BalanceCardProps {
  balance: number | null;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <div style={{
      padding: 24, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: 12,
      color: 'white', marginBottom: 24,
    }}>
      <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 4 }}>Available Balance</div>
      <div style={{ fontSize: 36, fontWeight: 'bold' }}>
        {balance !== null ? balance : '...'} <span style={{ fontSize: 18, fontWeight: 400 }}>credits</span>
      </div>
      <div style={{ fontSize: 13, opacity: 0.8, marginTop: 8 }}>
        1 credit = 1 hour of skill exchange
      </div>
    </div>
  );
};

export default BalanceCard;
