// const express = require('express');
// const http = require('http');
// const twilio = require('twilio');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.json());

// // Twilio Voice webhook endpoint
// app.post('/voice', (req, res) => {
//   const twiml = new twilio.twiml.VoiceResponse();
//   twiml.dial().client('web-client');

//   res.type('text/xml');
//   res.send(twiml.toString());
// });

// // WebSocket for real-time communication
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('audioData', (data) => {
//     // Broadcast received audio data to all clients except the sender
//     socket.broadcast.emit('audioData', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// npm install twilio-client socket.io-client


// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import Twilio from 'twilio-client';

// function App() {
//   const [socket, setSocket] = useState(null);
//   const [twilioDevice, setTwilioDevice] = useState(null);

//   useEffect(() => {
//     // Connect to WebSocket server
//     const socket = io('http://localhost:3001');
//     setSocket(socket);

//     // Initialize Twilio Device
//     const twilioToken = 'YOUR_TWILIO_TOKEN'; // Replace with your Twilio token
//     const device = new Twilio.Device(twilioToken);
//     setTwilioDevice(device);

//     device.on('ready', () => {
//       console.log('Twilio Device is ready');
//     });

//     device.on('incoming', (connection) => {
//       // Answer the incoming call
//       connection.accept();
//     });

//     return () => {
//       // Clean up
//       socket.disconnect();
//       device.destroy();
//     };
//   }, []);

//   const handleStartCall = () => {
//     // Start the Twilio call
//     const connection = twilioDevice.connect({
//       'To': 'PHONE_NUMBER', // Replace with the recipient's phone number
//       'From': 'WEB_CLIENT', // Twilio client name for the web app
//     });

//     // Set up audio stream for the call
//     connection.on('accept', () => {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then((stream) => {
//           const audioTracks = stream.getAudioTracks()[0];
//           const mediaStream = new MediaStream([audioTracks]);
          
//           const mediaRecorder = new MediaRecorder(mediaStream);
//           mediaRecorder.ondataavailable = (e) => {
//             if (e.data.size > 0) {
//               socket.emit('audioData', e.data);
//             }
//           };
//           mediaRecorder.start();
//         })
//         .catch((error) => {
//           console.error('Error getting audio stream:', error);
//         });
//     });
//   };

//   return (
//     <div className="App">
//       <h1>Real-time Audio Communication</h1>
//       <button onClick={handleStartCall}>Start Call</button>
//     </div>
//   );
// }

// export default App;
