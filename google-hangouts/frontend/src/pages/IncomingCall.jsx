import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx'

function IncomingCall() {
  const [response, setResponse] = useState('');

  useEffect(() => { 
    const delay = 5000;
    
    const makeDelayedCall = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}//inbound`, {
          method: 'POST',
        });

        if (response.ok) {
          const twiml = await response.text();
          setResponse(twiml);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Trigger the delayed call after the specified delay
    const timeoutId = setTimeout(makeDelayedCall, delay);

    return () => clearTimeout(timeoutId); 

  }, []); 

  return (
    <div>
      <h1>Twilio Frontend</h1>
      <div>
        <pre>{response}</pre>
      </div>
    </div>
  );
}

export default IncomingCall;
