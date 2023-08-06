import React, { useState, useEffect } from 'react';
import * as webRTC from './webRTC'


const Chat = () => {

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleReceivedMessage = (message) => {
    console.log('Received message in Chat component:', message);
    setChatMessages((prevMessages) => [...prevMessages, { content: message, sentByUser: false }]);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      console.log('Key Pressed:', event.key);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
    webRTC.sendMessageUsingDataChannel(message);
    console.log('Message sent:', message);

    setChatMessages((prevMessages) => [...prevMessages, { content: message, sentByUser: true }]);

    setMessage('');
    }
  };
// working on reseting chat after not active call
  useEffect(() => {
    // Set the callback for handling received messages
    webRTC.setOnDataChannelMessageCallback(handleReceivedMessage);

  //     return () => {
  //   // Cleanup function to clear chat messages when the component unmounts
  //   setChatMessages([]);
  // };

  }, []);



  return (
    <div>
       <div className="overflow-y-scroll h-300 border border-gray-300 p-10">
        {chatMessages.map((chatMessage, index) => (
          <div
            key={index}
            className={`${
              chatMessage.sentByUser ? 'text-right' : 'text-left'
            } ${chatMessage.sentByUser ? 'bg-blue-200' : 'bg-gray-200'} p-5 mb-5`}
          >
            {chatMessage.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 p-3 rounded-lg border border-gray-300"
      />
      <button onClick={sendMessage} className="ml-2 px-6 py-3 bg-blue-500 text-white rounded-lg">Send</button>
    </div>
  );
};

export default Chat;

