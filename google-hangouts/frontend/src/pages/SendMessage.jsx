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
      <div className='bg-gray-200 p-4 rounded shadow'>
        <h2 className='text-xl font-semibold mb-2'>Send Message</h2>
        <div className='mb-2'> 
          <label className='block font-medium'>To: </label>
          <input
            className='border rounded px-2 py-1 w-full'
            type="text"
            value={toNumber}
            onChange={(e) => setToNumber(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block font-medium'>Message: </label>
          <textarea
            className='border rounded px-2 py-1 w-full'
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
          />
        </div>
        <button 
        className='bg-[#FFD700] text-white px-4 py-2 rounded hover:bg-[#FFD704]'
        onClick={handleSendMessage}>Send Message</button>
        {success === true && <p className='text-green-600 mt-2' >Message sent successfully!</p>}
        {success === false && <p className='text-red-600 mt-2' >Message sending failed.</p>}
      </div>
      <div>
        <IncomingMessages />
      </div>
    </div>
  );
};

export default SendMessage;
