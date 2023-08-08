import React, { useState } from 'react';
import API_ENDPOINT from '../config.jsx'
import IncomingMessages from './IncomingMessages.jsx'

const SendMessage = () => {
  const [toNumber, setToNumber] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSendMessage = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: toNumber,
          body: messageBody,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  return (
    <div className='grid grid-cols-2'>
      <div>
        <h2>Send Message</h2>
        <div>
          <label>To: </label>
          <input
            type="text"
            value={toNumber}
            onChange={(e) => setToNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Message: </label>
          <textarea
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
          />
        </div>
        <button onClick={handleSendMessage}>Send Message</button>
        {success === true && <p>Message sent successfully!</p>}
        {success === false && <p>Message sending failed.</p>}
      </div>
      <div>
        <IncomingMessages />
      </div>
    </div>
  );
};

export default SendMessage;
