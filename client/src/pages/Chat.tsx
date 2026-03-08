const Chat = () => {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px', display: 'flex', gap: 16 }}>
      <div style={{ width: 240, border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
        <h3>Conversations</h3>
        <p style={{ color: '#888', fontSize: 14 }}>No conversations yet.</p>
      </div>
      <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
        <p style={{ color: '#888' }}>Select a conversation to start chatting.</p>
      </div>
    </div>
  );
};

export default Chat;
