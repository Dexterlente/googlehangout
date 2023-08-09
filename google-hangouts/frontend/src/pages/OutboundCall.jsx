import React, { useState } from 'react';
import API_ENDPOINT from '../config.jsx'

const OutboundCall = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [calling, setCalling] = useState(false);

  const handleCall = async () => {
    if (!phoneNumber) {
      alert('Please enter a phone number');
      return;
    }

    try {
      setCalling(true);
      const response = await fetch(`${API_ENDPOINT}/make-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: phoneNumber }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error making call:', error);
    } finally {
      setCalling(false);
    }
  };

  return (
    <div>
      <h2>Outbound Call</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <br />
      <button onClick={handleCall} disabled={calling}>
        {calling ? 'Calling...' : 'Make Call'}
      </button>
    </div>
  );
};

export default OutboundCall;
