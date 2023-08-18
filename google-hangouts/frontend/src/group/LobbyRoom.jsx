import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LobbyForm() {
  const [displayName, setDisplayName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedDisplayName = sessionStorage.getItem('display_name');
    if (storedDisplayName) {
      setDisplayName(storedDisplayName);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem('display_name', displayName);

    let roomCode = inviteCode;
    if (!roomCode) {
      roomCode = String(Math.floor(Math.random() * 10000));
    }

    // window.location = `room.html?room=${roomCode}`;
    navigate(`/room/${roomCode}`);
  };

  return (
    <form id="lobby__form" onSubmit={handleSubmit}>
      <label>
        Display Name:
        <input
          type="text"
          name="name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        Invite Code:
        <input
          type="text"
          name="room"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
      </label>
      <button type="submit">Join Room</button>
    </form>
  );
}

export default LobbyForm;
