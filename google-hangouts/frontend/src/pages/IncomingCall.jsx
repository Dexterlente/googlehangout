import React, { useState, useEffect } from 'react';
import { Device } from '@twilio/voice-sdk';
import API_ENDPOINT from '../config.jsx';

const IncomingCall = () => {
  const [activeCall, setActiveCall] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        // Fetch the access token from your server
        const response = await fetch(`${API_ENDPOINT}/generate-token`);
        const { payloadtoken } = await response.json();

        const device = new Device(payloadtoken);

        device.on('incoming', connection => {
            setActiveCall(connection);
          });
        // Simulate an incoming call when the component mounts
        const simulateIncomingCall = () => {
          const fakeConnection = {
            message: { from: '1234567890' },
            accept: () => console.log('Call accepted'),
            reject: () => console.log('Call rejected')
          };
          setActiveCall(fakeConnection);
        };

        simulateIncomingCall();

        // Clean up when component unmounts
        return () => {
          device.destroy();
        };
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  
//   const handleAccept = () => {
//     if (activeCall) {
//       activeCall.accept();
//     }
//   };

//   const handleReject = () => {
//     if (activeCall) {
//       activeCall.reject();
//     }
//   };


  return (
    <div>
      {activeCall && (
        <div>
          <p>Incoming call from: {activeCall.message.from}</p>
          <button onClick={() => activeCall.accept()}>Accept</button>
          <button onClick={() => activeCall.reject()}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default IncomingCall;


// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const IncomingCall = () => {
//   const [socket, setSocket] = useState(null);
//   const [incomingNumber, setIncomingNumber] = useState('');

//   useEffect(() => {
//     // Connect to the Socket.IO server
//     const socket = io('http://localhost:5000', {
//       transports: ['websocket'],
//     });
//     setSocket(socket);

//     // Listen for incomingCall event
//     socket.on('incomingCall', (data) => {
//       console.log('Received incoming call:', data);
//       setIncomingNumber(data);
//     });

//     return () => {
//       // Disconnect the socket when component unmounts
//       // socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Incoming Call Handling</h1>
//       {incomingNumber ? (
//         <p>Incoming call from: {incomingNumber}</p>
//       ) : (
//         <p>No incoming call at the moment.</p>
//       )}
//     </div>
//   );
// };

// export default IncomingCall;


// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { Device } from '@twilio/voice-sdk';
// import API_ENDPOINT from '../config.jsx'; // Import your API endpoint

// const IncomingCall = () => {
//   const [socket, setSocket] = useState(null);
//   const [twilioDevice, setTwilioDevice] = useState(null);
//   const [callStatus, setCallStatus] = useState('idle');
//   const [incomingConnection, setIncomingConnection] = useState(null);
//   const [incomingNumber, setIncomingNumber] = useState(''); // Add this state variable
//   const [serverInfo, setServerInfo] = useState('');

//   useEffect(() => {
//     // Connect to WebSocket server
//     const socket = io(`${API_ENDPOINT}/`, {
//       transports: ['websocket'],
//     });
//     setSocket(socket);

//     // Fetch Twilio token from the backend
//     const fetchTwilioToken = async () => {
//       try {
//         const response = await fetch(`${API_ENDPOINT}/generate-token`);
//         const data = await response.json();
//         const twilioToken = data.payloadtoken;

//         // Initialize Twilio Device with fetched token
//         const device = new Device(twilioToken);
//         setTwilioDevice(device);

//         device.on('ready', () => {
//           console.log('Twilio Device is ready');
//         });

//         device.on('incoming', (connection) => {
//           console.log('Incoming call');
//           setCallStatus('incoming');
//           setIncomingConnection(connection);

//           connection.accept();

//           connection.on('accept', () => {
//             navigator.mediaDevices.getUserMedia({ audio: true })
//               .then((stream) => {
//                 const audioTracks = stream.getAudioTracks()[0];
//                 const mediaStream = new MediaStream([audioTracks]);

//                 const mediaRecorder = new MediaRecorder(mediaStream);
//                 mediaRecorder.ondataavailable = (e) => {
//                   if (socket) {
//                     socket.emit('audioData', e.data);
//                   }
//                 };
//                 mediaRecorder.start();
//               })
//               .catch((error) => {
//                 console.error('Error getting audio stream:', error);
//               });
//           });

//           connection.on('disconnect', () => {
//             setCallStatus('idle');
//             setIncomingConnection(null);
//           });
//                     // Emit incoming call information to the server
//                     if (socket) {
//                       socket.emit('incomingCall', { incomingNumber: connection.parameters.From });
//                     }
          
//         });

//         return () => {
//           socket.disconnect();
//           device.destroy();
//         };
//       } catch (error) {
//         console.error('Error fetching Twilio token:', error);
//       }
//     };

//     socket.on('incomingCall', (incomingNumber) => {
//       console.log(incomingNumber);
//       setIncomingNumber(incomingNumber);
//     });

//     // Fetch and display server info
//     fetch(`${API_ENDPOINT}`)
//       .then(response => response.text())
//       .then(data => setServerInfo(data))
//       .catch(error => console.error('Error fetching server info:', error));
    
    
//     fetchTwilioToken();
//   }, []);

//   const answerCall = () => {
//     if (incomingConnection) {
//       incomingConnection.accept();
//       setCallStatus('active');
//     }
//   };

//   const hangUp = () => {
//     if (twilioDevice) {
//       twilioDevice.disconnectAll();
//       setCallStatus('idle');
//       console.log('Hang up');
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Inbound Call Receiver</h1>
//       {callStatus === 'incoming' ? (
//         <div>
//           <p>Server Info: {serverInfo}</p>
//           {/* <p>Incoming call...</p> */}
//           <p>Incoming call from: {incomingNumber}</p>

//           <button onClick={answerCall}>Answer</button>
//           <button onClick={hangUp}>Hang Up</button>
//         </div>
//       ) : callStatus === 'active' ? (
//         <div>
//           <p>Call in progress...</p>
//           <button onClick={hangUp}>Hang Up</button>
//         </div>
//       ) : (
//         <p>Waiting for incoming call...</p>
//       )}
//     </div>
//   );
// }

// export default IncomingCall;