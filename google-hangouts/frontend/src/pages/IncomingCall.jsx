import React, { useState, useEffect } from 'react';
import { Device } from '@twilio/voice-sdk';
import API_ENDPOINT from '../config.jsx';

const IncomingCall = () => {
  const [device, setDevice] = useState(null);
  const [activeCall, setActiveCall] = useState(null);

  useEffect(() => {
    // Fetch and set up the access token for the device
    const fetchAccessToken = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/generate-token`); // Replace with your endpoint
        const { payloadtoken } = await response.json();

        const newDevice = new Device(payloadtoken);
        setDevice(newDevice);

        newDevice.on('incoming', connection => {
          console.log('Incoming call received');
          setActiveCall(connection);

          // Handle events on the incoming connection
          connection.on('accept', () => {
            console.log('Incoming call accepted');
          });

          connection.on('disconnect', () => {
            console.log('Incoming call disconnected');
            setActiveCall(null); // Clear the active call
          });
        });
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <div>
      <h1>Incoming Call</h1>

      {activeCall ? (
        <div>
          <p>Incoming call from: {activeCall.message.from}</p>
          <button onClick={() => activeCall.accept()}>Accept</button>
          <button onClick={() => activeCall.reject()}>Reject</button>
        </div>
      ) : (
        <p>No incoming call</p>
      )}
    </div>
  );
};

export default IncomingCall;
