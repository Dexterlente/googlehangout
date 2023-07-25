import React, { useEffect } from 'react';
import io from 'socket.io-client';
import API_ENDPOINT from '../config.jsx'

const Chat = () => {
  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io(`${API_ENDPOINT}`,{
        // OMG I LOOK INTO THIS PROBLEM FOR OUR MY GOD
        transports: ['websocket'],
    });

    // Handle socket events
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      console.log(socket.id);
    });

    socket.on('message', (data) => {
      // Handle incoming messages from the server
      console.log('Received message:', data);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
      console.log('Disconnected from Socket.IO server');
    };
  }, []);

  // Render your chat interface here
  return (
    <div>
      {/* Your chat interface components go here */}
    </div>
  );
};

export default Chat;
