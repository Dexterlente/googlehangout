import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx'
import socketIOClient from 'socket.io-client';


const OutboundCall = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [calling, setCalling] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:5173'); 
    setSocket(socket);
  }, []);

    const startCall = async () => {
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

      // Start audio streaming
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const audioInput = audioContext.createMediaStreamSource(stream);
      // Use AudioWorkletNode for audio processing
      await audioContext.audioWorklet.addModule('audio-worklet-processor.js');
      const audioWorkletNode = new AudioWorkletNode(audioContext, 'audio-worklet-processor');

      audioWorkletNode.port.onmessage = (event) => {
        if (socket) {
          socket.emit('audioData', event.data); // Send audio data to the server
        }
      };

      audioInput.connect(audioWorkletNode);
      audioWorkletNode.connect(audioContext.destination);

      setIsCalling(true);
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const hangUp = () => {
    if (socket) {
      socket.disconnect();
      setIsCalling(false);
      setCalling(false);
      console.log('hangup')
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
      {/* <button onClick={startCall} disabled={calling}>
        {calling ? 'Calling...' : 'Make Call'}
      </button> */}
      {!calling ? (
        <button onClick={startCall}>Start Call</button>
      ) : (
        <button onClick={hangUp}>Hang Up</button>
      )}
    </div>
  );
};

export default OutboundCall;
