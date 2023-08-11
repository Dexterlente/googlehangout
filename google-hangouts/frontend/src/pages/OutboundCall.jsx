import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Device } from '@twilio/voice-sdk';
import API_ENDPOINT from '../config.jsx'; // Import your API endpoint

const OutboundCall = () => {

  const [socket, setSocket] = useState(null);
  const [twilioDevice, setTwilioDevice] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [calling, setCalling] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    // const socket = io('http://localhost:5173');
    const socket = io(`${API_ENDPOINT}`, {
      transports: ['websocket'],
    });
    setSocket(socket);

    // Fetch Twilio token from the backend
    const fetchTwilioToken = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/generate-token`);
        const data = await response.json();
        const twilioToken = data.payloadtoken;

        // Initialize Twilio Device with fetched token
        const device = new Device(twilioToken, { audioContext });
        setTwilioDevice(device);

        device.on('ready', () => {
          console.log('Twilio Device is ready');
        });

        device.on('incoming', (connection) => {
          // Answer the incoming call
          connection.accept();

          // Set up audio stream for the call
          connection.on('accept', () => {
            navigator.mediaDevices.getUserMedia({ audio: true })
              .then((stream) => {
                const audioTracks = stream.getAudioTracks()[0];
                const mediaStream = new MediaStream([audioTracks]);

                const mediaRecorder = new MediaRecorder(mediaStream);
                mediaRecorder.ondataavailable = (e) => {
                  if (socket) {
                    socket.emit('audioData', e.data); // Send audio data to the server
                  }
                };
                mediaRecorder.start();
              })
              .catch((error) => {
                console.error('Error getting audio stream:', error);
              });
          });
        });

        return () => {
          // Clean up
          socket.disconnect();
          device.destroy();
        };
      } catch (error) {
        console.error('Error fetching Twilio token:', error);
      }
    };

    fetchTwilioToken();
  }, []);

  const startCall = async () => {
    try {
      setCalling(true);
      if (!audioContext) {
        const newAudioContext = new AudioContext();
        setAudioContext(newAudioContext);
      const response = await fetch(`${API_ENDPOINT}/make-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: phoneNumber }),
      });
      const data = await response.json();
      console.log(data);
    } else {
      // If audioContext already exists, continue with existing context
      // ... the rest of your code ...
    }
    
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const hangUp = () => {
    if (twilioDevice) {
      twilioDevice.disconnectAll();
      setCalling(false);
      setAudioContext(null);
      console.log('hangup');
    }
  };

  return (
    <div className="App">
      <h1>Real-time Audio Communication</h1>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <br />
      {!calling ? (
        <button onClick={startCall}>Start Call</button>
      ) : (
        <button onClick={hangUp}>Hang Up</button>
      )}
    </div>
  );
}

export default OutboundCall;